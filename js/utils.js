(function () {
  "use strict";

  window.YF = window.YF || {};

  function formatDate(date) {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function normalizeWhitespace(value) {
    return value.trim().replace(/\s+/g, " ");
  }

  function isConfigured(endpoint) {
    return /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(endpoint);
  }

  window.YF.utils = { formatDate, normalizeWhitespace, isConfigured };
}());
