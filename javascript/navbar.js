$(document).ready(function () {
    $(".product-click").click(function () {
      $("#hide-product-hover").toggle(200);
      $("#hide-product-hover").css("display", "grid");
      let display = document.getElementById("hide-shopping-hover");
      if(display.style.display === "grid"){
        display.style.display = "none";
      }
    });
  });

  $(document).ready(function () {
    $(".shopping-click").click(function () {
      $("#hide-shopping-hover").toggle(200);
      $("#hide-shopping-hover").css("display", "grid");
      let display = document.getElementById("hide-product-hover");
      if(display.style.display === "grid"){
        display.style.display = "none";
      }
    });
  });
  $(document).ready(function () {
    $("#nav-bar").click(function () {
      $(".dropdown-content2").toggle(500);
    });
  });
  $(document).ready(function () {
    $("#nav-bar").click(function () {
      $(this).toggleClass("active");
    });
  });
  $(document).ready(function () {
    $("#searchbar").click(function () {
      $(".searchbar2").slideToggle(800);
    });
  });
  $(document).ready(function () {
    $("#searchbar2").click(function () {
      $(".searchbar3").toggle(800);
    });
  });
  $(document).ready(function () {
    $(".empty-cart").click(function () {
      localStorage.clear();
      document.getElementById("cart-set").textContent = "0";
      document.querySelector(".cart-total span").textContent = "0";
      location.reload();
    });
  });

  window.onscroll = function () {
    myFunction();
  };

  var navbar = document.getElementById("navbar");
  var sticky = navbar.offsetTop;

  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
      navbar.style.transition = "none";
    } else {
      navbar.classList.remove("sticky");
    }
  }
  function position() {
    let pos = document.querySelector(".search-button2");
    pos.style.left = "5%";
  }