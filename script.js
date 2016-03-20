(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js');
  }

  // respect user's privacy
  if (navigator.doNotTrack != "yes" && navigator.doNotTrack != "1" && navigator.msDoNotTrack != "1") {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-15321231-11', 'auto');
    ga('send', 'pageview');
  }
})();
