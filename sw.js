self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/index.html'
       '/myaccount.html'
       '/images/banner.jpg'
       '/images/logo.png'
       '/images/pic01.jpg'
       '/images/pic02.jpg'
       '/images/pic03.jpg'
       '/images/pic04.jpg'
       '/images/pic05.jpg'
       '/assets/css/images/arrow.svg'
       '/assets/css/images/bars.svg'
       '/assets/css/images/close.svg'
       '/assets/css/font-awesome.min.css'
       '/assets/css/main.css'
       '/assets/css/noscript.css'
       '/assets/js/breakpoints.min.js'
       '/assets/js/browser.min.js'
       '/assets/js/jquery.min.js'
       '/assets/js/jquery.scrollex.min.js'
       '/assets/js/query.scrolly.min.js'
       '/assets/js/main.js'
       '/assets/js/util.js'
       
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
