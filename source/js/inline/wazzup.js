(function () {

  function ChangeLinkWA() {
    this.text = "Здравствуйте! Номер моей заявки: {wz_metric}";
    this.cookieSource = "roistat_visit";
  }

  ChangeLinkWA.prototype.editLink = function(url, id) {
    if (decodeURIComponent(url.split("text=")[1]) === this.text.replace(/{wz_metric}/gi, id)) return;
    var regexNumberPhone = /\d+/;
    if (!regexNumberPhone.test(url)) return;

    var phone = url.match(regexNumberPhone)[0];
    var host = url.split(phone)[0];
    var newUrl = host === "https://wa.me/" ? host.toString() + phone.toString() + "?text=" + (this.text.replace(/{wz_metric}/gi, id)) : host.toString() + phone.toString() + "&text=" + (this.text.replace(/{wz_metric}/gi, id));

    return newUrl;
  };

  ChangeLinkWA.prototype.getCookie = function(name) {
    var cookie = document.cookie;
    var matches = cookie.match(new RegExp("(?:^|; )" + (name.replace(/([.$?*|{}()[]\/+^])/g, "\\$1")) + "=([^;]*)"));

    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  ChangeLinkWA.prototype.censusLinks = function() {
    var links = document.querySelectorAll('[href*="//wa.me"], [href*="//api.whatsapp.com/send"], [href*="//web.whatsapp.com/send"], [href^="whatsapp://send"]');
    var id = this.getCookie(this.cookieSource);
    var that = this;
    links.forEach(function(link) {
      var newLink = that.editLink(link.href, id);
      if (newLink) link.href = newLink;
    });
  };

  window.addEventListener("DOMContentLoaded", function() {
    if (!(window.__wz_scripts && window.__wz_scripts.scriptsChangeLinkWA)) {
      if (!window.__wz_scripts) window.__wz_scripts = {};
      window.__wz_scripts.scriptsChangeLinkWA = new ChangeLinkWA();
      var interval = setInterval(function() {
        var id = window.__wz_scripts.scriptsChangeLinkWA.getCookie(
          window.__wz_scripts.scriptsChangeLinkWA.cookieSource
        );
        if (id) {
          clearInterval(interval);
          window.__wz_scripts.scriptsChangeLinkWA.censusLinks();
        }
      }, 200);
    }
  });
})();
