/*
  Twenty 1.0 by HTML5 UP
  html5up.net | @n33co
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

skel.init({
  reset: 'full',
  breakpoints: {
    global:    { range: '*', href: 'css/style.css', containers: 1400, grid: { gutters: 50 } },
    wide:    { range: '-1680', href: 'css/style-wide.css', containers: 1200, grid: { gutters: 40 } },
    normal:    { range: '-1280', href: 'css/style-normal.css', containers: 960, lockViewport: true },
    narrow:    { range: '-980', href: 'css/style-narrow.css', containers: '95%', grid: { gutters: 30 } },
    narrower:  { range: '-840', href: 'css/style-narrower.css', grid: { collapse: 1 } },
    mobile:    { range: '-640', href: 'css/style-mobile.css', containers: '100%', grid: { gutters: 15, collapse: 2 } }
  }
}, {
  layers: {
    
    // Transform test.
      transformTest: function() {

        // Only use CSS transforms with touch devices.
          return (skel.vars.isTouch);
      
      },
  }
});

