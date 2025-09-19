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

  // New controls
  const recordToggle = document.getElementById('recordToggle');
  const profileNameInput = document.getElementById('profileName');
  const profileSelect = document.getElementById('profileSelect');
  const saveProfileBtn = document.getElementById('saveProfileBtn');
  const applyProfileBtn = document.getElementById('applyProfileBtn');
  const profilesListEl = document.getElementById('profilesList');

  // -------- Profiles helpers --------
  function loadProfiles(cb) {
    chrome.storage.local.get(['profiles'], function(res) {
      const profiles = Array.isArray(res.profiles) ? res.profiles : [];
      cb(profiles);
    });
  }
  function saveProfiles(profiles, cb) {
    chrome.storage.local.set({ profiles }, cb);
  }
  function renderProfilesList(profiles) {
    if (!profilesListEl) return;
    profilesListEl.innerHTML = '';
    if (!profiles.length) {
      const empty = document.createElement('div');
      empty.className = 'list-item';
      empty.textContent = 'No recorded cases yet';
      profilesListEl.appendChild(empty);
      return;
    }
    profiles.forEach((name) => {
      const row = document.createElement('div');
      row.className = 'list-item';
      const left = document.createElement('div');
      left.className = 'name';
      left.textContent = name;
      const right = document.createElement('div');
      right.className = 'list-actions';
      const selectBtn = document.createElement('button');
      selectBtn.className = 'mini-btn';
      selectBtn.textContent = 'Select';
      selectBtn.addEventListener('click', function() {
        profileNameInput && (profileNameInput.value = name);
        if (profileSelect) {
          for (let i = 0; i < profileSelect.options.length; i++) {
            if (profileSelect.options[i].value === name) {
              profileSelect.selectedIndex = i;
              break;
            }
          }
        }
      });
      const applyBtn = document.createElement('button');
      applyBtn.className = 'mini-btn';
      applyBtn.textContent = 'Apply';
      applyBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'applyProfile', profileName: name }, function(resp) {
              if (resp && resp.success) {
                updateStatus(`Applied: ${name}`, 'success');
              } else {
                updateStatus('Apply failed or no data recorded', 'error');
              }
            });
          }
        });
      });
      right.appendChild(selectBtn);
      right.appendChild(applyBtn);
      row.appendChild(left);
      row.appendChild(right);
      profilesListEl.appendChild(row);
    });
  }
  function updateProfileSelect(profiles, selected) {
    if (profileSelect) {
      while (profileSelect.firstChild) profileSelect.removeChild(profileSelect.firstChild);
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = profiles.length ? 'Select a profile' : 'No profiles yet';
      profileSelect.appendChild(placeholder);
      profiles.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        if (selected && selected === name) opt.selected = true;
        profileSelect.appendChild(opt);
      });
    }
    renderProfilesList(profiles);
  }
  function ensureUniqueName(base, existing) {
    if (!existing.includes(base)) return base;
    let i = 2;
    while (existing.includes(`${base} (${i})`)) i++;
    return `${base} (${i})`;
  }

  // Initialize profiles dropdown and list
  loadProfiles((profiles) => updateProfileSelect(profiles));

  // Save note button now just serves as a generic primary action label
  saveNoteBtn?.addEventListener('click', function() {
    updateStatus('Ready', 'info');
  });

  // Get page info functionality
  getPageInfoBtn?.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];
      const pageInfo = {
        title: currentTab.title,
        url: currentTab.url,
        timestamp: new Date().toLocaleString()
      };
      updateStatus(`Page: ${pageInfo.title}`, 'info');
      chrome.storage.local.set({lastPageInfo: pageInfo}, function() {});
    });
  });

  // Highlight text functionality
  highlightTextBtn?.addEventListener('click', function() {
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
  clearDataBtn?.addEventListener('click', function() {
    chrome.storage.local.clear(function() {
      updateStatus('All data cleared!', 'info');
      updateProfileSelect([]);
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
            chrome.runtime.sendMessage({ action: 'refreshBadge' });
          });
        });
      } catch (e) {
        updateStatus('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
  });

  // ---------- Record flow ----------
  recordToggle?.addEventListener('change', function() {
    if (recordToggle.checked) {
      loadProfiles(function(existing) {
        const raw = prompt('Enter a case name');
        const trimmed = (raw || '').trim();
        if (!trimmed) {
          recordToggle.checked = false;
          updateStatus('Recording cancelled', 'info');
          return;
        }
        const unique = ensureUniqueName(trimmed, existing);
        const updated = existing.concat(unique);
        saveProfiles(updated, function() {
          profileNameInput && (profileNameInput.value = unique);
          updateProfileSelect(updated, unique);
          updateStatus(`Recording: ${unique}`, 'success');
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'startRecording', profileName: unique });
            }
          });
        });
      });
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'stopRecording' });
        }
      });
      updateStatus('Recording stopped', 'info');
    }
  });

  // Save profile explicitly
  saveProfileBtn?.addEventListener('click', function() {
    const name = (profileNameInput?.value || '').trim();
    if (!name) {
      updateStatus('Enter a profile name first', 'error');
      return;
    }
    loadProfiles(function(existing) {
      const unique = ensureUniqueName(name, existing);
      const updated = existing.concat(unique);
      saveProfiles(updated, function() {
        updateProfileSelect(updated, unique);
        updateStatus(`Saved profile: ${unique}`, 'success');
      });
    });
  });

  // Apply selected profile
  applyProfileBtn?.addEventListener('click', function() {
    const selected = profileSelect?.value || profileNameInput?.value || '';
    const name = (selected || '').trim();
    if (!name) {
      updateStatus('Select or enter a profile name', 'error');
      return;
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'applyProfile', profileName: name }, function(resp) {
          if (resp && resp.success) {
            updateStatus(`Applied: ${name}`, 'success');
          } else {
            updateStatus('Apply failed or no data recorded', 'error');
          }
        });
      }
    });
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
