(function() {
  if (window.__linkClickListenerInstalled) return;
  window.__linkClickListenerInstalled = true;

  function onDocumentClick(event) {
    try {
      const anchor = event.target && (event.target.closest ? event.target.closest('a[href]') : null);
      if (!anchor || !anchor.href) return;

      const linkData = {
        href: anchor.href,
        text: (anchor.textContent || '').trim().slice(0, 500),
        pageTitle: document.title,
        pageUrl: location.href,
        clickedAt: new Date().toISOString()
      };

      // Send to background to persist reliably even if navigation happens
      chrome.runtime?.sendMessage({ action: 'recordLinkClick', link: linkData }, function() {
        // No-op; best-effort
      });

      // Optional: also log a lightweight activity entry
      chrome.runtime?.sendMessage({ action: 'logActivity', data: `linkClicked:${linkData.href}` }, function() {});
    } catch (e) {
      // Swallow errors in content script to avoid impacting the page
    }
  }

  // Capture phase helps fire before navigation
  document.addEventListener('click', onDocumentClick, true);
})();
