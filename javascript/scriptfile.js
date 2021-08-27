// JAVASCRIPT FOR INDEX-PAGE

function change() {
  let set = document.getElementById("set-eye-button");
  set.style.overflow = "visible";
  //  set.style.zIndex= '2';
  if (set.style.zIndex != 2) {
    set.style.zIndex = "2";
  } else {
    set.style.zIndex = "-1";
  }
  let hidden = document.getElementById("set-eye-button2");
  if (hidden.style.zIndex != -1) {
    hidden.style.zIndex = "-1";
    document.getElementById("register-icon-set2").type = "text";
  } else {
    hidden.style.zIndex = "2";
    document.getElementById("register-icon-set2").type = "password";
  }
}

// JAVASCRIPT FOR PRODUCT-CART

function increase() {
  let inc = document.getElementById("right-button");
  let p = document.getElementById("number-set");
  let i = p.innerHTML;
  if (i < 10) {
    i++;
  }
  if (i == 10) {
    alert("maximum value reach");
  }
  document.getElementById("number-set").innerHTML = i;
}
function decrease() {
  let p = document.getElementById("number-set");
  let i = p.innerHTML;
  if (i > 1) {
    i--;
  }
  if (i == 0) {
    alert("you have to select atleast one item");
  }

  document.getElementById("number-set").innerHTML = i;
}

// JAVA SCRIPT FOR DISPLAY.HTML

function hovertext() {
  let hov = document.querySelector(".details");
  let hovi = document.querySelector(".details2");
  let ho = document.querySelector(".details3");
  hov.style.display = "block";
  hovi.style.display = "none";
  ho.style.display = "none";
}
function hovertext2() {
  let hov = document.querySelector(".details");
  let hovi = document.querySelector(".details2");
  let ho = document.querySelector(".details3");
  hov.style.display = "none";
  hovi.style.display = "block";
  hov.style.overflow = "visible";
  ho.style.display = "none";
}
function hovertext3() {
  let hov = document.querySelector(".details");
  let hovi = document.querySelector(".details2");
  let ho = document.querySelector(".details3");
  hov.style.display = "none";
  hovi.style.display = "none";
  ho.style.display = "block";
}

// for product caterlog


