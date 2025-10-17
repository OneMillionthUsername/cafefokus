document.addEventListener("DOMContentLoaded", function (){
    var logo = document.getElementById("logo");
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    var infoElement = document.getElementById("info");

    window.addEventListener("scroll", function(){
        var scrollPos = this.window.scrollY;

        // Show the button when the user scrolls down 20px from the top of the document
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopBtn.style.display = "block";
          infoElement.style.clear = "right";
        } else {
          scrollToTopBtn.style.display = "none";
        }
        if(scrollPos > 100) {
            logo.style.width="0px";
        } else {
            logo.style.width = "250px";
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
      // Scroll to the top of the document when the button is clicked
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
});

  