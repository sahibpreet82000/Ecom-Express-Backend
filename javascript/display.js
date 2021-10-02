//------------------------JAVASCRIPT FOR SHOPPING-CART and Display---------------------------------

function increase() {
  let inc = document.getElementById("right-button");

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

//-------------------------------JAVA SCRIPT FOR DISPLAY.HTML----------------------------------

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
  