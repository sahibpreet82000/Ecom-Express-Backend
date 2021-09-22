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
    price: 550,
    inCart: 0,
  },
  {
    name: "pearl and stone anklet",
    tag: "10",
    price: 120,
    inCart: 0,
  },
  {
    name: "runnung shoes",
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
  let productvalue = localStorage.getItem("cart number");

  productvalue = parseInt(productvalue);

  if (productvalue) {
    localStorage.setItem("cart number", productvalue + 1);
    document.querySelector(".cart-total span").textContent = productvalue + 1;
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

//--------------------------------------------------for adding cart cost--------------------------------------------------

function totalCost(product) {
  let cartcost = localStorage.getItem("totalCost");

  if (cartcost != null) {
    cartcost = parseInt(cartcost);
    localStorage.setItem("totalCost", cartcost + product.price);
    document.getElementById("cart-set").innerHTML = cartcost + product.price;
  } else {
    localStorage.setItem("totalCost", product.price);
    document.getElementById("cart-set").innerHTML = product.price;
  }
}

//--------------------------------------------------for display cart --------------------------------------------------

function displaycart() {
  let cartitem = localStorage.getItem("productsCart");
  let productvalue = localStorage.getItem("cart number");
  cartitem = JSON.parse(cartitem);
  let productcontainer = document.querySelector(".table-container");
  console.log(cartitem);
  let cartcost = localStorage.getItem("totalCost");
  if (cartitem && productcontainer) {
    productcontainer.innerHTML = ` `;
    productcontainer.innerHTML += `    
<div class="cart-head">
Your Shopping-Cart Contains: <span> ${productvalue} items</span>
<div class = "basket heading">
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
            onclick="decrease()"
          ></i>
       
          <p20 id="number-set">${item.inCart}</p20>
       
          <i
            class="fas fa-angle-right"
            id="right-button"
            onclick="increase()"
          ></i>
     
    </li>
    <li>
  <span>${item.name.toUpperCase()}</span>
  </li>
  <li>
  <p35>$5</p35>
  </li>
  <li>
  <p35 id="change-price"> $ ${item.price * item.inCart} .00</p35>
  </li>
  <li>
    <i class="fas fa-times clicked" onclick="remove()" id="cross-sign"></i>
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
    <p34>Total:</p34>
    <span class="float" id="total"> ${cartcost}</span>
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

//--------------------------------------------------extra events--------------------------------------------------

$(document).ready(function () {
  $("#cross-sign").click(function () {
    $(".basket").fadeOut("slow", function () {
      // localStorage.removeItem("");
    });
  });
});
