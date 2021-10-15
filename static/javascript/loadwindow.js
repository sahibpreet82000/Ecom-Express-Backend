
//for product.html
// let getname = prompt("Enter your name?", "");
// let wel = document.getElementById("welcome");
// if (getname) {
//   wel.innerHTML = "<span>Welcome &nbsp;<span>" + getname;
// } 
// else {
//   wel.innerHTML = " ";
//   wel.style.overflow="hidden";
//   wel.style.margin="0px";
// }

function onloadcart() {
    let productvalue = localStorage.getItem("cart number");
    if (productvalue) {
      document.querySelector(".cart-total span").textContent = productvalue;
    }
  }

function onload(){
    let cartcost = localStorage.getItem("totalCost");
 if(cartcost){
    document.getElementById("cart-set").innerHTML = cartcost;
 }
}  
onloadcart();
onload();