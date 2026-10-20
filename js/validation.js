(function () {
  "use strict";

  window.YF = window.YF || {};
  var requiredFields = ["full-name", "department", "related-department", "proposed-solution", "expected-benefit", "privacy-consent"];

  function errorMessage(field) {
    if (field.id === "privacy-consent") return "Devam etmek için gizlilik onayını işaretleyin.";
    if (field.tagName === "SELECT") return "Lütfen bir seçenek belirleyin.";
    return "Bu alanı doldurmanız gerekiyor.";
  }

  function setError(field, message) {
    var output = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", field.id + "-error");
    if (output) output.textContent = message;
  }

  function clearError(field) {
    var output = document.getElementById(field.id + "-error");
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    if (output) output.textContent = "";
  }

  function validateField(field) {
    var empty = field.type === "checkbox" ? !field.checked : !field.value.trim();
    clearError(field);
    if (empty) {
      setError(field, errorMessage(field));
      return false;
    }
    var minimumWords = Number(field.dataset.minWords || 0);
    if (minimumWords > 0 && field.value.trim().split(/\s+/).filter(Boolean).length < minimumWords) {
      setError(field, "Lütfen adınızı ve soyadınızı en az iki kelime olarak yazın.");
      return false;
    }
    if (field.minLength > 0 && field.value.trim().length < field.minLength) {
      setError(field, "Lütfen en az " + field.minLength + " karakter yazın.");
      return false;
    }
    return true;
  }

  function validateForm() {
    var firstInvalid = null;
    var valid = true;
    requiredFields.forEach(function (id) {
      var field = document.getElementById(id);
      if (!validateField(field)) {
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  function init() {
    requiredFields.forEach(function (id) {
      var field = document.getElementById(id);
      var eventName = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";
      field.addEventListener(eventName, function () {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });
  }

  window.YF.validation = { init, validateForm };
}());
