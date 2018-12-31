(function () {
   window.singleWindows = window.singleWindows || {};

   window.singleWindowOpen = window.myFunc || function (url, type) {
      var w = window.singleWindows[type];
      if (w == undefined || w == null || w.closed) {
         window.singleWindows[type] = window.open(url);
      } else {
         w.focus();
      }
   };

   window.singleWindowClose = window.singleWindowClose || function (type) {
      var w = window.singleWindows[type];
      if (w && !w.closed) {
         w.close();
      }
      delete window.singleWindows[type];
   }
}());
