(function () {
  'use strict';

  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  // Fonts load with display=swap, so the layout can shift after the browser
  // has already jumped to the #fragment. Re-anchor once fonts are ready,
  // unless the visitor has started scrolling on their own.
  var userScrolled = false;
  var markScrolled = function () { userScrolled = true; };
  window.addEventListener('wheel', markScrolled, { once: true, passive: true });
  window.addEventListener('touchstart', markScrolled, { once: true, passive: true });
  window.addEventListener('keydown', markScrolled, { once: true });

  var initialHash = location.hash;
  if (initialHash && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      var target = document.getElementById(initialHash.slice(1));
      if (target && !userScrolled && location.hash === initialHash) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }

  // respect user's privacy
  var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  if (dnt === '1' || dnt === 'yes') {
    return;
  }

  var id = 'G-C1T6RBDK9J';

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);
})();
