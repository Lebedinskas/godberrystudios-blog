(function () {
  'use strict';

  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var toggle = document.querySelector('.search-toggle');
  var index = null;
  var fuse = null;
  var analyticsTimer = null;

  function esc(str) {
    return String(str).replace(/[<>&"']/g, function (c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function highlight(text, query) {
    if (!query || query.length < 2) return esc(text);
    var safe = esc(text);
    var words = query.trim().split(/\s+/).filter(function (w) { return w.length >= 2; });
    if (!words.length) return safe;
    var pattern = new RegExp('(' + words.map(function (w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|') + ')', 'gi');
    return safe.replace(pattern, '<mark>$1</mark>');
  }

  // Search analytics — fires 1s after user stops typing
  function trackSearch(query, resultCount) {
    if (analyticsTimer) clearTimeout(analyticsTimer);
    analyticsTimer = setTimeout(function () {
      if (query.length < 2) return;
      try {
        var data = JSON.stringify({
          event: 'search',
          query: query.substring(0, 100),
          results: resultCount,
          timestamp: new Date().toISOString()
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/cdn-cgi/rum', data);
        }
        // Also log to console for Cloudflare Web Analytics custom events
        console.info('[search]', query, '→', resultCount, 'results');
      } catch (e) { /* silent */ }
    }, 1000);
  }

  // Load search index on first open
  function loadIndex(cb) {
    if (index) return cb();
    if (typeof Fuse === 'undefined') {
      results.innerHTML = '<div class="search-empty">Search is loading, please try again in a moment.</div>';
      var s = document.createElement('script');
      s.src = '/js/fuse.min.js';
      s.onload = function () { loadIndex(cb); };
      s.onerror = function () {
        results.innerHTML = '<div class="search-empty">Search could not be loaded.</div>';
      };
      document.head.appendChild(s);
      return;
    }
    fetch('/index.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        index = data;
        fuse = new Fuse(data, {
          keys: [
            { name: 'title', weight: 0.4 },
            { name: 'description', weight: 0.3 },
            { name: 'content', weight: 0.2 },
            { name: 'tags', weight: 0.1 }
          ],
          threshold: 0.35,
          ignoreLocation: true,
          minMatchCharLength: 2
        });
        cb();
      })
      .catch(function () {
        results.innerHTML = '<div class="search-empty">Could not load search index.</div>';
      });
  }

  function openSearch() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadIndex(function () {
      input.focus();
      if (input.value.length > 1) doSearch(input.value);
    });
  }

  function closeSearch() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    input.value = '';
    results.innerHTML = '';
  }

  function doSearch(query) {
    if (!fuse || query.length < 2) {
      results.innerHTML = query.length > 0
        ? '<div class="search-empty">Keep typing...</div>'
        : '';
      return;
    }

    var matches = fuse.search(query, { limit: 8 });
    trackSearch(query, matches.length);

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-empty">No articles found for "' +
        esc(query) + '"</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < matches.length; i++) {
      var item = matches[i].item;
      var cats = item.categories && item.categories.length
        ? '<span class="sr-cat">' + esc(item.categories[0]) + '</span>'
        : '';
      html += '<a href="' + esc(item.url) + '" class="search-result">' +
        '<span class="sr-title">' + highlight(item.title, query) + '</span>' +
        '<span class="sr-meta">' + esc(item.date) + cats + '</span>' +
        '</a>';
    }
    results.innerHTML = html;
  }

  // Event listeners
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      openSearch();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearch();
    });
  }

  if (input) {
    input.addEventListener('input', function () {
      doSearch(this.value);
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeSearch();
    }
    if (e.key === 'Enter' && overlay.classList.contains('active')) {
      var first = results.querySelector('.search-result');
      if (first) {
        window.location.href = first.getAttribute('href');
      }
    }
  });

  // Arrow key navigation in results
  if (input) {
    input.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('.search-result');
      if (!items.length) return;

      var active = results.querySelector('.search-result.focused');
      var idx = -1;
      for (var i = 0; i < items.length; i++) {
        if (items[i] === active) { idx = i; break; }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (active) active.classList.remove('focused');
        idx = (idx + 1) % items.length;
        items[idx].classList.add('focused');
        items[idx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (active) active.classList.remove('focused');
        idx = idx <= 0 ? items.length - 1 : idx - 1;
        items[idx].classList.add('focused');
        items[idx].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        if (active) {
          e.preventDefault();
          window.location.href = active.getAttribute('href');
        }
      }
    });
  }
})();
