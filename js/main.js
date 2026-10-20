(function () {
  "use strict";

  function fillSelect(id, options) {
    var select = document.getElementById(id);
    options.forEach(function (department) {
      var option = document.createElement("option");
      option.value = department;
      option.textContent = department;
      select.appendChild(option);
    });
  }

  function initCounters() {
    document.querySelectorAll("textarea[maxlength]").forEach(function (textarea) {
      var counter = document.querySelector("[data-counter-for='" + textarea.id + "']");
      if (!counter) return;
      textarea.addEventListener("input", function () {
        counter.textContent = textarea.value.length + " / " + textarea.maxLength;
      });
    });
  }

  function init() {
    fillSelect("department", window.YF.CONFIG.departments);
    fillSelect(
      "related-department",
      window.YF.CONFIG.departments.concat(window.YF.CONFIG.companyWideOption)
    );
    initCounters();
    window.YF.notifications.init();
    window.YF.validation.init();
    window.YF.form.init();
    document.getElementById("config-warning").hidden = window.YF.utils.isConfigured(window.YF.CONFIG.appsScriptUrl);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
