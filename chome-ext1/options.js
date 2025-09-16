// Options page logic: stores settings in chrome.storage.sync
const el = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
  // Load settings
  chrome.storage.sync.get(['settings'], (res) => {
    const settings = res.settings || { highlightColor: '#ffff00', autoRemove: true, siteMode: 'enabled' };
    el('highlightColor').value = settings.highlightColor || '#ffff00';
    el('autoRemove').checked = settings.autoRemove !== false;
    el('siteMode').value = settings.siteMode || 'enabled';
  });

  el('save').addEventListener('click', () => {
    const settings = {
      highlightColor: el('highlightColor').value,
      autoRemove: el('autoRemove').checked,
      siteMode: el('siteMode').value
    };
    chrome.storage.sync.set({ settings }, () => {
      el('msg').textContent = 'Saved!';
      setTimeout(() => (el('msg').textContent = ''), 1500);
      // Notify all tabs to refresh settings
      chrome.runtime.sendMessage({ action: 'settingsUpdated', settings });
    });
  });
});



