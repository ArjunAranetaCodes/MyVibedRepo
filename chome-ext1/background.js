// Background service worker for the Chrome extension.
// This file runs in a service worker context (no DOM) and handles
// lifecycle events, cross-page coordination, alarms, and messaging.
console.log('[BG] Service worker loaded');

// --- Recording state helpers (per-tab, session-scoped) ---
async function getRecordingState() {
  return new Promise((resolve) => {
    chrome.storage.session.get(['recordingTabs'], (res) => {
      resolve(res.recordingTabs || {});
    });
  });
}
async function setRecordingState(recordingTabs) {
  return new Promise((resolve) => {
    chrome.storage.session.set({ recordingTabs }, resolve);
  });
}
async function startRecordingOnTab(tabId, profileName) {
  const state = await getRecordingState();
  state[String(tabId)] = { profileName };
  await setRecordingState(state);
  try { chrome.tabs.sendMessage(tabId, { action: 'startRecording', profileName }); } catch (e) {}
}
async function stopRecordingOnTab(tabId) {
  const state = await getRecordingState();
  delete state[String(tabId)];
  await setRecordingState(state);
  try { chrome.tabs.sendMessage(tabId, { action: 'stopRecording' }); } catch (e) {}
}

// Create context menu entries on install
chrome.runtime.onInstalled.addListener(() => {
  try {
    chrome.contextMenus.create({
      id: 'save-selection',
      title: 'Save selection as note',
      contexts: ['selection']
    });
    chrome.contextMenus.create({
      id: 'highlight-selection',
      title: 'Highlight selected text',
      contexts: ['selection']
    });
    console.log('[BG:contextMenus] Created context menu items');
  } catch (e) {
    console.error('[BG:contextMenus] Failed to create items', e);
  }
});

// Respond to badge refresh requests (e.g., after import)
chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  if (req && req.action === 'refreshBadge') {
    chrome.storage.sync.get(['notes'], (res) => {
      updateBadgeCount((res.notes || []).length);
      sendResponse({ ok: true });
    });
    return true;
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab || !tab.id) return;
  if (info.menuItemId === 'save-selection' && info.selectionText) {
    const note = {
      text: info.selectionText,
      url: tab.url,
      title: tab.title,
      createdAt: new Date().toISOString()
    };
    chrome.storage.sync.get(['notes'], (res) => {
      const notes = res.notes || [];
      notes.push(note);
      chrome.storage.sync.set({ notes }, () => {
        console.log('[BG:contextMenus] Saved note from selection');
        updateBadgeCount(notes.length);
      });
    });
  }
  if (info.menuItemId === 'highlight-selection') {
    chrome.tabs.sendMessage(tab.id, { action: 'highlightText' });
  }
});

// Commands (keyboard shortcuts)
chrome.commands.onCommand.addListener((command) => {
  console.log('[BG:commands] Received command:', command);
  if (command === 'highlight_selection') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'highlightText' });
      }
    });
  }
  if (command === 'save_note') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Ask content script for current selection
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (resp) => {
          const text = resp && resp.text ? resp.text.trim() : '';
          if (!text) return;
          const note = {
            text,
            url: tabs[0].url,
            title: tabs[0].title,
            createdAt: new Date().toISOString()
          };
          chrome.storage.sync.get(['notes'], (res) => {
            const notes = res.notes || [];
            notes.push(note);
            chrome.storage.sync.set({ notes }, () => {
              console.log('[BG:commands] Saved note from command');
              updateBadgeCount(notes.length);
            });
          });
        });
      }
    });
  }
});

// Keep badge in sync with notes count
function updateBadgeCount(count) {
  const text = count > 0 ? String(Math.min(count, 999)) : '';
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: '#5b8def' });
}

// Initialize badge on startup
chrome.runtime.onStartup?.addListener(() => {
  chrome.storage.sync.get(['notes'], (res) => {
    updateBadgeCount((res.notes || []).length);
  });
});

// Listen for extension installation
chrome.runtime.onInstalled.addListener(function(details) {
  console.log('[BG:onInstalled] Fired with reason =', details.reason);
  if (details.reason === 'install') {
    console.log('Extension installed for the first time');
    
    // Set default storage values
    chrome.storage.local.set({
      installDate: new Date().toISOString(),
      usageCount: 0,
      notes: []
    });
  } else if (details.reason === 'update') {
    console.log('[BG:onInstalled] Extension updated from version', details.previousVersion);
    // If migrations are required between versions, handle them here.
  }
});

// Listen for tab updates. When a tab finishes loading, bump a usage counter and restart recording if active.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading') {
    console.log('[BG:onUpdated] Tab', tabId, 'is loading...');
  }
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('[BG:onUpdated] Tab finished loading:', { tabId, url: tab.url, title: tab.title });
    
    // Increment usage count safely.
    chrome.storage.local.get(['usageCount'], function(result) {
      if (chrome.runtime.lastError) {
        console.error('[BG:onUpdated] Failed to read usageCount:', chrome.runtime.lastError);
        return;
      }
      const previousCount = result.usageCount || 0;
      const newCount = previousCount + 1;
      console.log('[BG:onUpdated] Updating usageCount:', { previousCount, newCount });
      chrome.storage.local.set({usageCount: newCount}, function() {
        if (chrome.runtime.lastError) {
          console.error('[BG:onUpdated] Failed to write usageCount:', chrome.runtime.lastError);
        } else {
          console.log('[BG:onUpdated] usageCount updated successfully');
        }
      });
    });

    // Restart recording if this tab is marked as recording in session state
    (async () => {
      const state = await getRecordingState();
      const entry = state[String(tabId)];
      if (entry && entry.profileName) {
        try {
          chrome.tabs.sendMessage(tabId, { action: 'startRecording', profileName: entry.profileName });
          console.log('[BG:onUpdated] Re-started recording on tab', tabId);
        } catch (e) {
          console.warn('[BG:onUpdated] Failed to send startRecording after navigation');
        }
      }
    })();
  }
});

// Listen for messages from content scripts or popup.
// Use this to centralize privileged operations (e.g., tabs, storage).
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('[BG:onMessage] Received message:', request, 'from', sender?.tab ? { id: sender.tab.id, url: sender.tab.url } : 'extension');
  
  if (request.action === 'getTabInfo') {
    console.log('[BG:onMessage:getTabInfo] Querying active tab in current window');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        const payload = {
          title: tabs[0].title,
          url: tabs[0].url,
          id: tabs[0].id
        };
        console.log('[BG:onMessage:getTabInfo] Responding with', payload);
        sendResponse(payload);
      }
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'logActivity') {
    console.log('[BG:onMessage:logActivity] Logging activity:', request.data);
    const activity = {
      timestamp: new Date().toISOString(),
      action: request.data,
      url: sender.tab ? sender.tab.url : 'unknown'
    };
    
    chrome.storage.local.get(['activityLog'], function(result) {
      if (chrome.runtime.lastError) {
        console.error('[BG:onMessage:logActivity] Failed to read activityLog:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      const log = result.activityLog || [];
      log.push(activity);
      
      // Keep only last 50 activities
      if (log.length > 50) {
        log.splice(0, log.length - 50);
      }
      
      chrome.storage.local.set({activityLog: log}, function() {
        if (chrome.runtime.lastError) {
          console.error('[BG:onMessage:logActivity] Failed to write activityLog:', chrome.runtime.lastError);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else {
          console.log('[BG:onMessage:logActivity] Activity logged. Total entries =', log.length);
          sendResponse({success: true});
        }
      });
    });
    
    return true; // Respond asynchronously after storage write completes
  }

  // From popup: start/stop on active tab using session state (persists across navigations)
  if (request.action === 'startRecordingForActiveTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0]) {
        await startRecordingOnTab(tabs[0].id, request.profileName);
        sendResponse({ ok: true });
      } else {
        sendResponse({ ok: false });
      }
    });
    return true;
  }

  if (request.action === 'stopRecordingForActiveTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0]) {
        await stopRecordingOnTab(tabs[0].id);
        sendResponse({ ok: true });
      } else {
        sendResponse({ ok: false });
      }
    });
    return true;
  }

  // From content page: ask if this tab is recording
  if (request.action === 'getRecordingStateForTab') {
    (async () => {
      const state = await getRecordingState();
      const tabId = sender && sender.tab && sender.tab.id ? String(sender.tab.id) : '';
      const entry = tabId ? state[tabId] : undefined;
      sendResponse({ recording: !!entry, profileName: entry ? entry.profileName : undefined });
    })();
    return true;
  }

  // In-page toolbar stop button
  if (request.action === 'stopRecordingFromPage') {
    if (sender && sender.tab && sender.tab.id) {
      stopRecordingOnTab(sender.tab.id);
      sendResponse({ ok: true });
    } else {
      sendResponse({ ok: false });
    }
    return true;
  }
});

// Periodic cleanup task (runs every hour).
// This uses chrome.alarms to wake the service worker periodically.
console.log('[BG] Creating hourly cleanup alarm');
chrome.alarms.create('cleanup', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log('[BG:onAlarm] Alarm fired:', alarm.name);
  if (alarm.name === 'cleanup') {
    console.log('[BG:onAlarm] Running periodic cleanup of activityLog');
    
    // Clean up old activity logs (older than 7 days).
    chrome.storage.local.get(['activityLog'], function(result) {
      if (chrome.runtime.lastError) {
        console.error('[BG:onAlarm] Failed to read activityLog:', chrome.runtime.lastError);
        return;
      }
      if (result.activityLog) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const recentLogs = result.activityLog.filter(activity => 
          new Date(activity.timestamp) > oneWeekAgo
        );
        console.log('[BG:onAlarm] Pruning log entries:', {
          before: result.activityLog.length,
          after: recentLogs.length
        });
        
        chrome.storage.local.set({activityLog: recentLogs}, function() {
          if (chrome.runtime.lastError) {
            console.error('[BG:onAlarm] Failed to write pruned activityLog:', chrome.runtime.lastError);
          } else {
            console.log('[BG:onAlarm] Cleanup complete');
          }
        });
      } else {
        console.log('[BG:onAlarm] No activityLog found to prune');
      }
    });
  }
});

// Handle extension icon click (if no popup is configured in manifest.action).
chrome.action.onClicked.addListener(function(tab) {
  console.log('[BG:onClicked] Extension icon clicked on tab:', { id: tab.id, url: tab.url, title: tab.title });
  
  // You can add custom behavior here if needed
  // For example, opening a specific page or executing a command
});
