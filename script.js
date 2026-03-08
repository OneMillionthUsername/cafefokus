document.addEventListener("DOMContentLoaded", function () {
    // E-Mail-Maskierung – schützt vor Spam-Bots
    document.querySelectorAll(".js-email").forEach(function (el) {
        var email = el.dataset.u + "\u0040" + el.dataset.d;
        el.href = "mailto:" + email;
        el.textContent = email;
    });

    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function () {
        var scrollPos = window.scrollY;

        if (scrollPos > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});
