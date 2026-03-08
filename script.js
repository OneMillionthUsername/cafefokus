document.addEventListener("DOMContentLoaded", function () {
    // E-Mail-Maskierung – schützt vor Spam-Bots
    document.querySelectorAll(".js-email").forEach(function (el) {
        var email = el.dataset.u + "\u0040" + el.dataset.d;
        el.href = "mailto:" + email;
        el.textContent = email;
    });

});
