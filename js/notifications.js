(function () {
  "use strict";

  window.YF = window.YF || {};
  var hideTimer;

  function hide() {
    document.getElementById("notification").hidden = true;
  }

  function show(type, title, message) {
    var notification = document.getElementById("notification");
    var icon = document.getElementById("notification-icon");
    document.getElementById("notification-title").textContent = title;
    document.getElementById("notification-message").textContent = message;
    notification.classList.toggle("notification--error", type === "error");
    icon.setAttribute("href", type === "error" ? "#icon-alert" : "#icon-check");
    notification.hidden = false;
    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hide, 8000);
  }

  function init() {
    document.getElementById("notification-close").addEventListener("click", hide);
  }

  window.YF.notifications = { init, show, hide };
}());
