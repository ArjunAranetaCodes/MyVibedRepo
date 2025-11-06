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

      chrome.runtime?.sendMessage({ action: 'recordLinkClick', link: linkData }, function() {});
      chrome.runtime?.sendMessage({ action: 'logActivity', data: `linkClicked:${linkData.href}` }, function() {});
    } catch (e) {}
  }

  document.addEventListener('click', onDocumentClick, true);

  let recording = false;
  let currentProfileName = null;
  let pageClickHandler = null;
  let fieldChangeHandler = null;
  let fieldInputHandler = null;
  let toolbarEl = null;
  const typingThrottleMs = 500;
  const lastTypingBySelector = Object.create(null);

  function getElementSelector(el) {
    try {
      if (!el) return '';
      if (el.id) return `#${CSS.escape(el.id)}`;
      const parts = [];
      let node = el;
      while (node && node.nodeType === 1 && parts.length < 5 && node !== document.body) {
        let selector = node.nodeName.toLowerCase();
        if (node.name) selector += `[name="${CSS.escape(node.name)}"]`;
        if (node.classList && node.classList.length) {
          selector += '.' + Array.from(node.classList).slice(0, 2).map(c => CSS.escape(c)).join('.');
        }
        const parent = node.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(n => n.nodeName === node.nodeName);
          if (siblings.length > 1) {
            const index = siblings.indexOf(node) + 1;
            selector += `:nth-of-type(${index})`;
          }
        }
        parts.unshift(selector);
        node = parent;
      }
      return parts.length ? parts.join(' > ') : el.tagName.toLowerCase();
    } catch (_) { return ''; }
  }

  function createToolbar(profileName) {
    if (toolbarEl) return toolbarEl;
    const bar = document.createElement('div');
    bar.style.position = 'fixed';
    bar.style.top = '0';
    bar.style.left = '0';
    bar.style.right = '0';
    bar.style.zIndex = '2147483647';
    bar.style.display = 'flex';
    bar.style.alignItems = 'center';
    bar.style.justifyContent = 'space-between';
    bar.style.padding = '8px 12px';
    bar.style.background = 'linear-gradient(90deg, rgba(123,87,255,0.95), rgba(102,126,234,0.95))';
    bar.style.color = '#fff';
    bar.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Arial';
    bar.style.fontSize = '13px';
    bar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';

    const left = document.createElement('div');
    left.textContent = `Recording: ${profileName}`;
    left.style.fontWeight = '600';

    const right = document.createElement('div');
    const stop = document.createElement('button');
    stop.textContent = 'Stop';
    stop.style.border = '0';
    stop.style.borderRadius = '6px';
    stop.style.padding = '6px 10px';
    stop.style.cursor = 'pointer';
    stop.style.background = 'rgba(0,0,0,0.25)';
    stop.style.color = '#fff';
    stop.addEventListener('click', function() {
      stopRecording();
      chrome.runtime?.sendMessage({ action: 'stopRecordingFromPage' });
    });
    right.appendChild(stop);

    bar.appendChild(left);
    bar.appendChild(right);
    document.documentElement.appendChild(bar);
    toolbarEl = bar;
    return bar;
  }

  function destroyToolbar() {
    if (toolbarEl && toolbarEl.parentNode) toolbarEl.parentNode.removeChild(toolbarEl);
    toolbarEl = null;
  }

  function persistEntry(entry) {
    chrome.storage.local.get(['recordings'], function(res) {
      const recordings = res.recordings || {};
      const list = recordings[currentProfileName] || [];
      list.push(entry);
      recordings[currentProfileName] = list;
      chrome.storage.local.set({ recordings });
    });
  }

  function startRecording(profileName) {
    if (recording) return;
    recording = true;
    currentProfileName = profileName || 'Unnamed';
    createToolbar(currentProfileName);

    pageClickHandler = function(e) {
      try {
        const target = e.target;
        if (target && target.tagName && target.tagName.toLowerCase() === 'input') {
          const t = (target.type || '').toLowerCase();
          if (t === 'radio' || t === 'checkbox') return;
        }
        const selector = getElementSelector(target);
        const text = (target && (target.innerText || target.textContent) || '').trim().slice(0, 200);
        const href = target && target.closest && target.closest('a[href]') ? target.closest('a[href]').href : undefined;
        const entry = { type: 'click', selector, text, href, pageUrl: location.href, pageTitle: document.title, timestamp: new Date().toISOString() };
        persistEntry(entry);
      } catch (_) {}
    };
    document.addEventListener('click', pageClickHandler, true);

    fieldChangeHandler = function(e) {
      try {
        const el = e.target; if (!el) return;
        const tag = (el.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'select' && tag !== 'textarea') return;
        const type = (el.type || '').toLowerCase();
        const selector = getElementSelector(el);
        const name = el.name || undefined;
        const value = type === 'checkbox' ? undefined : (el.value ?? '');
        const checked = (type === 'checkbox' || type === 'radio') ? !!el.checked : undefined;
        let labelText = '';
        try {
          if (el.id) {
            const lbl = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
            if (lbl) labelText = (lbl.innerText || lbl.textContent || '').trim().slice(0, 200);
          }
          if (!labelText) {
            const lbl2 = el.closest && el.closest('label');
            if (lbl2) labelText = (lbl2.innerText || lbl2.textContent || '').trim().slice(0, 200);
          }
        } catch (_) {}
        const entry = { type: 'input-change', inputType: type || tag, name, value, checked, selector, label: labelText || undefined, pageUrl: location.href, pageTitle: document.title, timestamp: new Date().toISOString() };
        persistEntry(entry);
      } catch (_) {}
    };
    document.addEventListener('change', fieldChangeHandler, true);

    fieldInputHandler = function(e) {
      try {
        const el = e.target; if (!el) return;
        const tag = (el.tagName || '').toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') return;
        const type = (el.type || '').toLowerCase();
        if (type === 'checkbox' || type === 'radio') return; // handled by change
        const selector = getElementSelector(el);
        const now = Date.now();
        const last = lastTypingBySelector[selector] || 0;
        if (now - last < typingThrottleMs) return; // throttle
        lastTypingBySelector[selector] = now;
        const name = el.name || undefined;
        const value = el.value ?? '';
        const entry = { type: 'input-typing', inputType: type || tag, name, value, selector, pageUrl: location.href, pageTitle: document.title, timestamp: new Date().toISOString() };
        persistEntry(entry);
      } catch (_) {}
    };
    document.addEventListener('input', fieldInputHandler, true);
  }

  function stopRecording() {
    if (!recording) return;
    recording = false;
    if (pageClickHandler) { document.removeEventListener('click', pageClickHandler, true); pageClickHandler = null; }
    if (fieldChangeHandler) { document.removeEventListener('change', fieldChangeHandler, true); fieldChangeHandler = null; }
    if (fieldInputHandler) { document.removeEventListener('input', fieldInputHandler, true); fieldInputHandler = null; }
    destroyToolbar();
  }

  function setValueAndDispatch(el, value, type, checked) {
    try {
      if (!el) return false;
      const tag = (el.tagName || '').toLowerCase();
      if (tag === 'textarea' || (tag === 'input' && (type !== 'checkbox' && type !== 'radio'))) {
        if (el.value !== value) {
          el.value = value == null ? '' : String(value);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
      if (tag === 'select') {
        if (el.value !== value) {
          el.value = value;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
      if (tag === 'input' && (type === 'checkbox' || type === 'radio')) {
        const desired = !!checked;
        if (el.checked !== desired) {
          el.checked = desired;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
    } catch (_) {}
    return false;
  }

  function applyProfileByEntries(entries) {
    let applied = 0;
    const latestByKey = new Map();
    for (const e of entries) {
      if (e.type !== 'input-change' && e.type !== 'input-typing') continue;
      const key = e.selector || `${e.inputType}|${e.name||''}`;
      latestByKey.set(key, e);
    }
    for (const e of latestByKey.values()) {
      const type = (e.inputType || '').toLowerCase();
      let el = null;
      if (e.selector) {
        try { el = document.querySelector(e.selector); } catch (_) { el = null; }
      }
      if (!el && e.name) {
        if (type === 'radio') {
          el = Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).find(r => String(r.value) === String(e.value)) || null;
        } else {
          el = document.querySelector(`[name="${CSS.escape(e.name)}"]`);
        }
      }
      if (el && setValueAndDispatch(el, e.value, type, e.checked)) {
        applied++;
      }
    }
    return { applied, total: latestByKey.size };
  }

  try {
    chrome.runtime?.sendMessage({ action: 'getRecordingStateForTab' }, function(res) {
      if (res && res.recording && res.profileName) startRecording(res.profileName);
    });
  } catch (_) {}

  chrome.runtime.onMessage.addListener(function(req, _sender, sendResponse) {
    if (!req || !req.action) return;
    if (req.action === 'startRecording') startRecording(req.profileName);
    if (req.action === 'stopRecording') stopRecording();
    if (req.action === 'applyProfile' && req.profileName) {
      try {
        chrome.storage.local.get(['recordings'], function(res) {
          const all = res.recordings || {};
          const entries = all[req.profileName] || [];
          console.log('[FormCapture] Apply profile:', req.profileName, { count: entries.length, entries });
          const result = applyProfileByEntries(entries);
          sendResponse && sendResponse({ success: true, applied: result.applied, total: result.total });
        });
      } catch (_) {
        sendResponse && sendResponse({ success: false });
      }
      return true;
    }
  });
})();


