(function () {
  "use strict";

  window.YF = window.YF || {};
  var sending = false;

  function setSending(active) {
    var button = document.getElementById("submit-button");
    sending = active;
    button.disabled = active;
    button.querySelector(".send-button__label").hidden = active;
    button.querySelector(".send-button__loading").hidden = !active;
  }

  function cleanValues() {
    var fullName = document.getElementById("full-name");
    fullName.value = window.YF.utils.normalizeWhitespace(fullName.value);
    ["proposed-solution", "expected-benefit"].forEach(function (id) {
      var field = document.getElementById(id);
      field.value = field.value.trim();
    });
  }

  function submit(event) {
    if (sending) {
      event.preventDefault();
      return;
    }
    cleanValues();

    if (!window.YF.validation.validateForm()) {
      event.preventDefault();
      window.YF.notifications.show("error", "Lütfen formu kontrol edin.", "Eksik alanları doldurarak yeniden deneyin.");
      return;
    }

    if (!window.YF.utils.isConfigured(window.YF.CONFIG.appsScriptUrl)) {
      event.preventDefault();
      window.YF.notifications.show("error", "Google Apps Script bağlantısı yapılmadı.", "js/config.js dosyasına web uygulamanızın /exec adresini ekleyin.");
      document.getElementById("config-warning").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSending(true);
    window.setTimeout(function () { setSending(false); }, 2500);
  }

  function init() {
    var form = document.getElementById("idea-form");
    form.action = window.YF.CONFIG.appsScriptUrl;
    form.target = "_blank";
    form.noValidate = true;
    form.addEventListener("submit", submit);
  }

  window.YF.form = { init };
}());
