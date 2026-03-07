document.addEventListener("DOMContentLoaded", function () {
    var logo = document.getElementById("logo");
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function () {
        var scrollPos = window.scrollY;

        if (scrollPos > 100) {
            logo.style.width = "0px";
        } else {
            logo.style.width = "150px";
        }

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
