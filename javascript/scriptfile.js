// JAVASCRIPT FOR INDEX-PAGE

function change() {
  let set = document.getElementById("set-eye-button");
  set.style.overflow = "visible";
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

// JAVASCRIPT FOR SHOPPING-CART and Display

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

// function shopping() {
//   document.getElementsByClassName(
//     "table-container"
//   ).innerHTML = `<table class="table-bordered" id="remove-table">
//   <tr id="table-heading">
//     <td><p37>Sr.No</p37></td>
//     <td><p37>Products</p37></td>
//     <td><p37>Quantity</p37></td>
//     <td><p37>Product-Name</p37></td>
//     <td><p37>Service Charges</p37></td>
//     <td><p37>Price</p37></td>
//     <td><p37>Remove</p37></td>
//   </tr>
//   <tr id="table-heading2" style="text-align: center">
//     <td style="width: 0%">1.</td>
//     <td style="width: 20%">
//       <img id="cart-image-set" src="/images/20.jpg" alt="image" />
//     </td>
//     <td style="width: 13%">
//       <table class="qunatity-table">
//         <tr class="qunatity-table">
//           <td class="qunatity-table" style="width: 5%">
//             <i
//               class="fas fa-angle-left"
//               id="left-button"
//               onclick="decrease()"
//             ></i>
//           </td>
//           <td class="qunatity-table" style="width: 5%">
//             <p20 id="number-set">1</p20>
//           </td>
//           <td class="qunatity-table" style="width: 5%">
//             <i
//               class="fas fa-angle-right"
//               id="right-button"
//               onclick="increase()"
//             ></i>
//           </td>
//         </tr>
//       </table>
//     </td>
//     <td style="width: 9%">Formal Shirt</td>
//     <td style="width: 6%"><p35>$5</p35></td>
//     <td style="width: 10%"><p35>$180</p35></td>
//     <td style="width: 0%">
//       <i class="fas fa-times" id="cross-sign"></i>
//     </td>
//   </tr>
// </table>`;
//   console.log(shopping);
// }
// JAVASCRIPT FOR PRODUCT-CART
function cart() {
  let s = document.getElementById("submit").innerText.replace("$", "");
  let car = document.getElementById("cart-quantity");
  let c = document.getElementById("cart-set");
  c.innerText = "$ " + s;
  let a = car.innerHTML;
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
