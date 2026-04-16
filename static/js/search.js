(function () {
  'use strict';

  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var toggle = document.querySelector('.search-toggle');
  var index = null;
  var fuse = null;

  // Load search index on first open
  function loadIndex(cb) {
    if (index) return cb();
    fetch('/index.json')
      .then(function (r) { return r.json(); })
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

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-empty">No articles found for "' +
        query.replace(/[<>&"]/g, '') + '"</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < matches.length; i++) {
      var item = matches[i].item;
      var cats = item.categories && item.categories.length
        ? '<span class="sr-cat">' + item.categories[0] + '</span>'
        : '';
      html += '<a href="' + item.url + '" class="search-result">' +
        '<span class="sr-title">' + item.title + '</span>' +
        '<span class="sr-meta">' + item.date + cats + '</span>' +
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
    // Ctrl/Cmd + K to open
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    // ESC to close
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeSearch();
    }
    // Enter navigates to first result
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
