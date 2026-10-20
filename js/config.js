(function () {
  "use strict";

  window.YF = window.YF || {};

  window.YF.CONFIG = Object.freeze({
    // Dağıtılmış Google Apps Script web uygulamanızın /exec adresini yazın.
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbxp3OR6qi7aVNvmvXxwsFYd2R5qX523js2CZGrLNJhs0s-65oOQGXi4SQhIn6uvD-XIOQ/exec",
    departments: [
      "Üretim / Islah",
      "Kalite / İnsan Kaynakları",
      "Satış & Pazarlama",
      "Tohum İşleme ve Paketleme",
      "Finans & Muhasebe",
      "Tohum Çıkarma",
      "İhracat",
      "Reklam",
      "Tohum Test Laboratuvarı",
      "Doku Kültürü Laboratuvarı",
      "Gaziler Tesisi",
      "Korkuteli Tesisi"
    ],
    companyWideOption: "Yüksel Tohum (Şirket Geneli / Diğer)"
  });
}());
