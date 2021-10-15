let cart = document.querySelectorAll(".new-cart");
//--------------------------------------------------for adding products --------------------------------------------------

let products = [
  {
    name: "formal shirt",
    tag: "7",
    price: 280,
    inCart: 0,
  },
  {
    name: "dining table",
    tag: "5",
    price: 500,
    inCart: 0,
  },
  {
    name: "pearl and stone anklet",
    tag: "10",
    price: 120,
    inCart: 0,
  },
  {
    name: "running shoes",
    tag: "8",
    price: 150,
    inCart: 0,
  },
  {
    name: "wall lamp",
    tag: "6",
    price: 400,
    inCart: 0,
  },
  {
    name: "wall lamp",
    tag: "9",
    price: 150,
    inCart: 0,
  },
  {
    name: "stones bangles",
    tag: "11",
    price: 257,
    inCart: 0,
  },
  {
    name: "Black Saree",
    tag: "17",
    price: 500,
    inCart: 0,
  },
];
for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    cartnumber(products[i]);
    totalCost(products[i]);
  });
}

//--------------------------------------------------for setting cart number--------------------------------------------------

function cartnumber(product) {
  let getNum = localStorage.getItem("cart number");

  getNum = parseInt(getNum);

  if (getNum) {
    localStorage.setItem("cart number", getNum + 1);
    document.querySelector(".cart-total span").textContent = getNum + 1;
  } else {
    localStorage.setItem("cart number", 1);
    document.querySelector(".cart-total span").textContent = 1;
  }
  setItems(product);
}

//--------------------------------------------------for adding cart content--------------------------------------------------

function setItems(product) {
  let cartitem = localStorage.getItem("productsCart");
  cartitem = JSON.parse(cartitem);
  if (cartitem != null) {
    if (cartitem[product.tag] == undefined) {
      cartitem = {
        ...cartitem,
        [product.tag]: product,
      };
    }
    cartitem[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartitem = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsCart", JSON.stringify(cartitem));
}

//--------------------------------------------------for setting totalcost--------------------------------------------------

function totalCost(product) {
  let gettex = localStorage.getItem("totalCost");
  let getNum = localStorage.getItem("cart number");
  let tax = getNum * 5;
  if (gettex != null) {
    gettex = parseInt(gettex);
    localStorage.setItem("totalCost", gettex + product.price + tax);
    document.getElementById("cart-set").innerHTML = gettex + product.price;
  } else {
    localStorage.setItem("totalCost", product.price + tax);
    document.getElementById("cart-set").innerHTML = product.price;
  }
}

//--------------------------------------------------for display products--------------------------------------------------

function displaycart() {
  let cartitem = localStorage.getItem("productsCart");
  cartitem = JSON.parse(cartitem);
  let productcontainer = document.querySelector(".table-container");
  let getNum = localStorage.getItem("cart number");
  let gettex = localStorage.getItem("totalCost");
  gettex = JSON.parse(gettex);
  getNum = JSON.parse(getNum);
  gettex = parseInt(gettex);
  let tax = getNum * 5;
  if (cartitem && productcontainer) {
    productcontainer.innerHTML = ` `;
    productcontainer.innerHTML += `    
<div class="cart-head">
Your Shopping-Cart Contains: <span> ${getNum} </span> items
<div class = "basketHeading heading">
  <ul>
    <li><p37>Products</p37></li>
    <li><p37>Quantity</p37></li>
    <li><p37>Product-Name</p37></li>
    <li><p37>Tax</p37></li>
    <li><p37>Price</p37></li>
    <li><p37>Remove</p37><li>
  </ul>
  </div>`;
    Object.values(cartitem).map((item) => {
      productcontainer.innerHTML += ` 

<div class="basket">
<ul>
<li>
    <img id="cart-image-set" src="/images/${item.tag}.jpg" alt="image" />
    </li>
    <li>
          <i
            class="fas fa-angle-left"
            id="left-button"
          ></i>
       
          <p20 id="number-set">${item.inCart}</p20>
       
          <i
            class="fas fa-angle-right"
            id="right-button"       
          ></i>
     
    </li>
    <li>
  <span>${item.name.toUpperCase()}</span>
  </li>
  <li>
  <p35>5</p35>
  </li>
  <li>
  <p35 id="change-price"> ${item.price} .00</p35>
  </li>
  <li>
    <i class="fas fa-times clicked" id="cross-sign"></i>
  </li>
    </ul>
    </div>
`;
    });
    productcontainer.innerHTML += `
<div class="cart-value">
<ul>
  <br />
  <br />
  <li>
  <p34>Tax:</p34>
    <span class="float" id="total"> ${tax}</span></br>
    <p34>Total:</p34>
    <span class="float2" id="total"> ${gettex}</span> 
  </li>
</ul>
</div>
<div class="buttons">
<button class="cart-button"><a href="#">Continue to Basket</a></button>
<button class="cart-button2" type="menu" id="menu">
<a href="/html/products.html">Back to Home</a>
</button>
</div>
`;
  } else {
    productcontainer.innerHTML = `<div class="cart-empty">
    <p>your cart is empty :(</p>
      <div class="buttons">
          <button class="cart-button"><a href="#">Continue to Basket</a></button>
<button class="cart-button2">
<a href="/html/products.html">Back to Home</a>
</button>
</div>
    </div>`;
  }
}

displaycart();

//--------------------------------------------------for remove cart item--------------------------------------------------

let remove = document.querySelectorAll("#cross-sign");
remove.forEach((e) => {
  e.addEventListener("click", function (el) {
    // const cartitem = [inCart];
    // let b = el.target.parentElement.parentElement.parentElement.parentElement;
    let cartitem = localStorage.getItem("productsCart");
    cartitem = JSON.parse(cartitem);
    // cartitem.push(product);
    el.target.parentElement.parentElement.parentElement.classList.add("remove");
    // console.log(b);

    localStorage.setItem("productsCart", JSON.stringify(cartitem));

    localStorage.clear();
  });
});


// ------------------------------for increase quatity--------------------------------
let inc = document.querySelectorAll("#right-button");
inc.forEach((i) => {
  i.addEventListener("click", function (e) {
    let l = e.target.parentElement.children[1].innerHTML;
    let b =
      e.target.parentElement.parentElement.children[4].children[0].innerHTML
        .replaceAll("$", "")
        .replaceAll(".00", "");
    let total = document.querySelector(".float2").innerHTML.replaceAll("$", "");
    let totalItems = document.querySelector(".cart-head span").innerHTML;
    let tax = document.querySelector(".float").innerHTML;
    let tex = document.querySelector(".float2");
    let num = document.querySelector(".cart-head span");
    let cartitem = localStorage.getItem("productsCart");
    let existing = [];
    let existingNumber = [];
    let getNum = localStorage.getItem("cart number");
    let gettex = localStorage.getItem("totalCost");
    gettex = JSON.parse(gettex);
    let cartHeading = document.querySelector("#cart-set");
    let cartHeadingValue = document.querySelector(".cart-total span");
    console.log(typeof cartHeading.innerHTML);
    tax = parseInt(tax);
    l = parseInt(l);
    b = parseInt(b);
    total = parseInt(total);
    totalItems = parseInt(totalItems);
    cartitem = JSON.parse(cartitem);
    if (l < 10 && b) {
      l++;
      e.target.parentElement.children[1].innerHTML = l;
      Object.values(cartitem).map((item) => {
        document.querySelector(".float2").innerHTML = total + b;
      });
      document.querySelector(".cart-head span").innerHTML = totalItems + 1;
      document.querySelector(".float").innerHTML = tax + 5;
      existing.push(tex.innerHTML);
      existingNumber.push(num.innerHTML);
      cartHeading.innerHTML = total;
      cartHeadingValue.innerHTML = totalItems + 1;
    }
    localStorage.setItem("totalCost", JSON.stringify(existing));
    localStorage.setItem("cart number", JSON.stringify(existingNumber));
    if (l == 10) {
      alert("maximum value reach");
    }
  });
});

// ------------------------------for decrease quatity--------------------------------

let dec = document.querySelectorAll("#left-button");
dec.forEach((i) => {
  i.addEventListener("click", function (e) {
    let l = e.target.parentElement.children[1].innerHTML;
    let b =
      e.target.parentElement.parentElement.children[4].children[0].innerHTML
        .replaceAll("$", "")
        .replaceAll(".00", "");
    let total = document.querySelector(".float2").innerHTML.replaceAll("$", "");
    let totalItems = document.querySelector(".cart-head span").innerHTML;
    let tax = document.querySelector(".float").innerHTML;
    let cartitem = localStorage.getItem("productsCart");
    let tex = document.querySelector(".float2");
    let num = document.querySelector(".cart-head span");
    let getNum = localStorage.getItem("cart number");
    let gettex = localStorage.getItem("totalCost");
    let cartHeading = document.querySelector("#cart-set");
    let cartHeadingValue = document.querySelector(".cart-total span");
    let existing = [];
    let existingNumber = [];
    tax = parseInt(tax);
    l = parseInt(l);
    b = parseInt(b);
    total = parseInt(total);
    cartitem = JSON.parse(cartitem);
    totalItems = parseInt(totalItems);
    gettex = JSON.parse(gettex);
    if (l > 1 && b) {
      l--;
      e.target.parentElement.children[1].innerHTML = l;
      Object.values(cartitem).map((item) => {
        document.querySelector(".float2").innerHTML = total - b;
        document.querySelector(".cart-head span").innerHTML = totalItems - 1;
      });
      document.querySelector(".float").innerHTML = tax - 5;
      existing.push(tex.innerHTML);
      existingNumber.push(num.innerHTML);
      cartHeading.innerHTML = total;
      cartHeadingValue.innerHTML = totalItems - 1;
    }
    localStorage.setItem("totalCost", JSON.stringify(existing));
    localStorage.setItem("cart number", JSON.stringify(existingNumber));

    if (l == 0) {
      alert("You have to select atlease one item");
    }
  });
});


//--------------------------------------------------extra events--------------------------------------------------

$(document).ready(function () {
  $("#cross-sign").click(function () {
    $(".basket").fadeOut("slow", function () {
      // localStorage.removeItem("");
    });
  });
});
