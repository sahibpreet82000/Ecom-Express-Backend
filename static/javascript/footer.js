window.addEventListener("scroll", function () {
    var element = document.querySelector(".footer-content");
    var position = element.getBoundingClientRect();
  
    // checking for partial visibility
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.style.visibility = "visible";
      element.style.animation = "slide-up 1s";
    }
  });