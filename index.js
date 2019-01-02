(function () {
   window.singleWindows = window.singleWindows || {};

   window.localSingleWindowsClose = window.localSingleWindowsClose || function(types) {
      for (var type of types) {
         var w = window.singleWindows[type];
         if (w && !w.closed) {
            w.close();
         }
         delete window.singleWindows[type];
      }
   }

   window.handleStorageChange = window.handleStorageChange || function(event) {
      if (event.key != "type") {
         return;
      }

      var data = event.newValue;
      var typesString = data.match(/\d+:(.*)/)[1];
      var types = typesString.split(/\s*,\s*/);

      if (types.length == 1 && types[0].length == 0) {
         types = Object.keys(window.singleWindows);
      }
      
      window.localSingleWindowsClose(types);
   };

   window.addEventListener('storage', window.handleStorageChange);

   window.handleWindowUnload = window.handleWindowUnload || function (event) {
      window.singleWindowClose();
   }

   window.addEventListener("unload", window.handleWindowUnload);

   window.singleWindowOpen = window.singleWindowOpen || function (url, type) {
      var w = window.singleWindows[type];
      if (w == undefined || w == null || w.closed) {
         window.singleWindows[type] = window.open(url);
      } else {
         w.focus();
      }
   };

   window.singleWindowClose = window.singleWindowClose || function () {
      var hasStorageFeature = typeof (Storage) !== "undefined";

      var types = [];
      if (arguments.length > 0) {
         types = Array.from(arguments);
         hasStorageFeature && localStorage.setItem("type", 1 * new Date() + ":" + types.join(","));
      } else {
         types = Object.keys(window.singleWindows);
         hasStorageFeature && localStorage.setItem("type", 1 * new Date() + ":");
      }

      window.localSingleWindowsClose(types);
   }
}());
