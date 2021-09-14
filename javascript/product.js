let cart = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "occaecat cupidata",
    tag: "6",
    price: 180,
    inCart: 0,
  },
  {
    name: "emu fugiat quo",
    tag: "26",
    price: 250,
    inCart: 0,
  },
  {
    name: "officia deserunt",
    tag: "11",
    price: 259,
    inCart: 0,
  },
  {
    name: "formal shirt",
    tag: "19",
    price: 280,
    inCart: 0,
  },
  {
    name: "white shirt",
    tag: "7",
    price: 280,
    inCart: 0,
  },
  {
    name: "blue shirt",
    tag: "20",
    price: 380,
    inCart: 0,
  },
  {
    name: "casual shoes",
    tag: "21",
    price: 180,
    inCart: 0,
  },
  {
    name: "formal shoes",
    tag: "22",
    price: 200,
    inCart: 0,
  },
  {
    name: "trekk shoes",
    tag: "23",
    price: 250,
    inCart: 0,
  },
  {
    name: "blazer",
    tag: "24",
    price: 500,
    inCart: 0,
  },
  {
    name: "blazer",
    tag: "26",
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

function setting() {
  let sortt = document.querySelector(".product-section");

  products.sort((a, b) => a.price - b.price);
  let s = document.querySelector(".section-background");
  s.style.display = "none";
  
  let p = document.querySelector(".section-background2").style.background ="#f5f5f5";
  products.forEach((item) => {
    var elem = document.createElement("div");
    elem.innerHTML = `
    
      <div class="product-images">
        <img src="/images/${item.tag}.jpg" alt="" />
        <a href="/html/display.html">
          ${item.name.toUpperCase()} <br />
          <div id="submit"> $${item.price}</div>
        </a>
        <button type="submit" class="add-cart">ADD TO CART</button>
      </div>


  `;
    sortt.appendChild(elem);
    // $(this).toggle(1000);
  });
}

function setting2() {
  let sortt2 = document.querySelector(".product-section2");

  products.sort((a, b) => b.price - a.price);

  let s = document.querySelector(".section-background");
  s.style.display = "none";
 
  let p = document.querySelector(".section-background3").style.background ="#f5f5f5";
  products.forEach((item) => {
    var elem = document.createElement("div");
    elem.innerHTML = `
              <div class="product-images">
                <img src="/images/${item.tag}.jpg" alt="" />
                <a href="/html/display.html">
                  ${item.name.toUpperCase()} <br />
                  <div id="submit">$${item.price}</div>
                </a>
                <button type="submit" class="add-cart">ADD TO CART</button>
              </div>
            `;
    sortt2.appendChild(elem);
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

$(document).ready(function () {
  $("#cross-sign").click(function () {
    $(".basket").fadeOut("slow", function () {
      // localStorage.removeItem("");
    });
  });
});

function remove(){
  localStorage.clear();  
}

// for animation 

