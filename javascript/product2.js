let cart = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "center table",
    tag: "30",
    price: 280,
    inCart: 0,
  },
  {
    name: "Media Table",
    tag: "32",
    price: 280,
    inCart: 0,
  },
  {
    name: "Entertainment table",
    tag: "31",
    price: 380,
    inCart: 0,
  },
  {
    name: "2 seater sofa",
    tag: "33",
    price: 180,
    inCart: 0,
  },
  {
    name: "street lamp",
    tag: "6",
    price: 200,
    inCart: 0,
  },
  {
    name: "street lamp",
    tag: "9",
    price: 250,
    inCart: 0,
  },
  {
    name: "anklet",
    tag: "10",
    price: 500,
    inCart: 0,
  },
  {
    name: "stone bangle",
    tag: "11",
    price: 450,
    inCart: 0,
  },
  {
    name: "clock",
    tag: "34",
    price: 150,
    inCart: 0,
  },
];
for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    cartnumber(products[i]);
    totalCost(products[i]);
  });
}

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
function totalCost(product) {
  let cartcost = localStorage.getItem("totalCost");
  //   console.log("the price is ", product.price);
  if (cartcost != null) {
    cartcost = parseInt(cartcost);
    localStorage.setItem("totalCost", cartcost + product.price);
    document.getElementById("cart-set").innerHTML = cartcost + product.price;
  } else {
    localStorage.setItem("totalCost", product.price);
    document.getElementById("cart-set").innerHTML = product.price;
  }
}
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

<div class="basket basket-remove">
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
  <span>${item.name}</span>
  </li>
  <li>
  <p35>$5</p35>
  </li>
  <li>
  <p35 id="change-price"> $ ${item.price * item.inCart} .00</p35>
  </li>
  <li>
    <i class="fas fa-times" id="cross-sign"></i>
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
<button class="cart-button2" >
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

$(document).ready(function () {
  $("#cross-sign").click(function () {
    $(".basket-remove").fadeOut("slow", function () {
      $(".basket-remove").remove();
    });
  });
});

// for animation 
window.addEventListener("scroll", function () {
  var element = document.querySelector(".section-content");
  var position = element.getBoundingClientRect();

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    element.style.visibility = "visible";
    element.style.animation = "slide-up 1s";
  }
});


function remove(){
  localStorage.clear();  
}
