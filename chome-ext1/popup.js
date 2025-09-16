// Popup script for the Chrome extension
document.addEventListener('DOMContentLoaded', function() {
  const noteInput = document.getElementById('noteInput');
  const saveNoteBtn = document.getElementById('saveNote');
  const getPageInfoBtn = document.getElementById('getPageInfo');
  const highlightTextBtn = document.getElementById('highlightText');
  const clearDataBtn = document.getElementById('clearData');
  const exportBtn = document.getElementById('exportNotes');
  const importInput = document.getElementById('importNotes');
  const status = document.getElementById('status');

  // Load saved note
  chrome.storage.local.get(['savedNote'], function(result) {
    if (result.savedNote) {
      noteInput.value = result.savedNote;
    }
  });

  // Save note functionality
  saveNoteBtn.addEventListener('click', function() {
    const note = noteInput.value.trim();
    if (note) {
      chrome.storage.local.set({savedNote: note}, function() {
        updateStatus('Note saved successfully!', 'success');
      });
    } else {
      updateStatus('Please enter a note first!', 'error');
    }
  });

  // Get page info functionality
  getPageInfoBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];
      const pageInfo = {
        title: currentTab.title,
        url: currentTab.url,
        timestamp: new Date().toLocaleString()
      };
      
      updateStatus(`Page: ${pageInfo.title}`, 'info');
      
      // Store page info
      chrome.storage.local.set({lastPageInfo: pageInfo}, function() {
        console.log('Page info saved');
      });
    });
  });

  // Highlight text functionality
  highlightTextBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'highlightText'}, function(response) {
        if (response && response.success) {
          updateStatus('Text highlighted!', 'success');
        } else {
          updateStatus('No text selected or error occurred', 'error');
        }
      });
    });
  });

  // Clear data functionality
  clearDataBtn.addEventListener('click', function() {
    chrome.storage.local.clear(function() {
      noteInput.value = '';
      updateStatus('All data cleared!', 'info');
    });
  });

  // Export notes (from sync storage)
  exportBtn?.addEventListener('click', function() {
    chrome.storage.sync.get(['notes'], function(res) {
      const notes = res.notes || [];
      const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notes-export.json';
      a.click();
      URL.revokeObjectURL(url);
      updateStatus('Notes exported', 'success');
    });
  });

  // Import notes (merge with existing)
  importInput?.addEventListener('change', function(evt) {
    const file = evt.target.files && evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function() {
      try {
        const imported = JSON.parse(String(reader.result || '[]'));
        chrome.storage.sync.get(['notes'], function(res) {
          const existing = res.notes || [];
          const merged = existing.concat(imported);
          chrome.storage.sync.set({ notes: merged }, function() {
            updateStatus('Notes imported', 'success');
            // Update badge count via background helper if present
            chrome.runtime.sendMessage({ action: 'refreshBadge' });
          });
        });
      } catch (e) {
        updateStatus('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
  });

  // Update status message
  function updateStatus(message, type) {
    status.textContent = message;
    status.className = 'status';
    
    switch(type) {
      case 'success':
        status.style.background = 'rgba(76, 175, 80, 0.3)';
        break;
      case 'error':
        status.style.background = 'rgba(244, 67, 54, 0.3)';
        break;
      case 'info':
        status.style.background = 'rgba(33, 150, 243, 0.3)';
        break;
      default:
        status.style.background = 'rgba(255, 255, 255, 0.1)';
    }
    
    // Reset status after 3 seconds
    setTimeout(() => {
      status.textContent = 'Ready to use!';
      status.style.background = 'rgba(255, 255, 255, 0.1)';
    }, 3000);
  }
});
