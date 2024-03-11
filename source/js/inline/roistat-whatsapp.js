(function() {
  if (window.roistat !== undefined) {
      handler();
  } else {
      var pastCallback = typeof window.onRoistatAllModulesLoaded === "function" ? window.onRoistatAllModulesLoaded : null;
      window.onRoistatAllModulesLoaded = function () {
          if (pastCallback !== null) {
              pastCallback();
          }
          handler();
      };
  }

  function handler() {
      function init() {
          appendMessageToLinks();

          var delays = [1000, 5000, 15000];
          setTimeout(function func(i) {
              if (i === undefined) {
                  i = 0;
              }
              appendMessageToLinks();
              i++;
              if (typeof delays[i] !== 'undefined') {
                  setTimeout(func, delays[i], i);
              }
          }, delays[0]);
      }

      function replaceQueryParam(url, param, value) {
          var explodedUrl = url.split('?');
          var baseUrl = explodedUrl[0] || '';
          var query = '?' + (explodedUrl[1] || '');
          var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
          var queryWithoutParameter = query.replace(regex, "$1").replace(/&$/, '');
          return baseUrl + (queryWithoutParameter.length > 2 ? queryWithoutParameter  + '&' : '?') + (value ? param + "=" + value : '');
      }

      function appendMessageToLinks() {
          var message = document.querySelector('.js-whatsapp-message-container').text;
          var text = message.replace(/{roistat_visit}/g, window.roistatGetCookie('roistat_visit'));
          text = encodeURI(text);
          var linkElements = document.querySelectorAll('[href*="//wa.me"], [href*="//api.whatsapp.com/send"], [href*="//web.whatsapp.com/send"], [href^="whatsapp://send"]');
          for (var elementKey in linkElements) {
              if (linkElements.hasOwnProperty(elementKey)) {
                  var element = linkElements[elementKey];
                  element.href = replaceQueryParam(element.href, 'text', text);
              }
          }
      }
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
      } else {
          init();
      }
  };
})();
