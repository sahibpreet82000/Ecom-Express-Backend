window.addEventListener("scroll", function () {
  var element = document.querySelector(".banner-images");

  var position = element.getBoundingClientRect();

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    element.style.visibility = "visible";
    element.style.animation = "slide-up 1s";
  }
});
window.addEventListener("scroll", function () {
  var element = document.querySelector(".home-grid");
  var position = element.getBoundingClientRect();

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    element.style.visibility = "visible";
    element.style.animation = "slide-up 1s";
  }
});
window.addEventListener("scroll", function () {
  var element = document.querySelector(".special-grid");
  var position = element.getBoundingClientRect();

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    element.style.visibility = "visible";
    element.style.animation = "slide-up 1s";
  }
});
