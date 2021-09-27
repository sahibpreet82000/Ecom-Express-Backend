let cart = document.querySelectorAll(".add-cart");
//--------------------------------------------------for adding products --------------------------------------------------

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
//--------------------------------------------------for price low to high--------------------------------------------------

function setting() {
  let sortt = document.querySelector(".product-section");

  products.sort((a, b) => a.price - b.price);
  let s = document.querySelector(".section-background");
  s.style.display = "none";

  let p = (document.querySelector(".section-background2").style.background =
    "#f5f5f5");
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
//--------------------------------------------------for price high to low--------------------------------------------------

function setting2() {
  let sortt2 = document.querySelector(".product-section2");

  products.sort((a, b) => b.price - a.price);

  let s = document.querySelector(".section-background");
  s.style.display = "none";

  let p = (document.querySelector(".section-background3").style.background =
    "#f5f5f5");
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
//--------------------------------------------------for setting products--------------------------------------------------

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
//--------------------------------------------------for setting cost--------------------------------------------------

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
//--------------------------------------------------for display products--------------------------------------------------

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
  <p34>Tax:</p34>
  <span class="float" id="total"> ${tax}</span></br>
  <p34>Total:</p34>
  <span class="float2" id="total"> ${cartcost + tax}</span> 
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

//------------------------------------------------for animation----------------------------------------------------------
window.addEventListener("scroll", function () {
  var element = document.querySelector(".section-content");
  var position = element.getBoundingClientRect();

  //---------------------------------------- checking for partial visibility------------------------------------------------

  if (position.top < window.innerHeight && position.bottom >= 0) {
    element.style.visibility = "visible";
    element.style.animation = "slide-up 1s";
  }
});

//--------------------------------------------------for remove cart item--------------------------------------------------

let remove = document.querySelectorAll("#cross-sign");
remove.forEach((e) => {
  e.addEventListener("click", function (el) {
    // let cartitem = localStorage.getItem("productsCart");
    // cartitem = JSON.parse(cartitem);
    // cartitem.splice(el.target,1);

    // localStorage.setItem("productsCart", JSON.stringify(cartitem));
    // let productvalue = localStorage.getItem("cart number");
    // console.log(el.target.parentElement.parentElement.parentElement);
    el.target.parentElement.parentElement.parentElement.classList.add("remove");
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
    let totalItems = document
      .querySelector(".cart-head span")
      .innerHTML.replaceAll("items", "");

    // console.log(
    //   // e.target.parentElement.parentElement.parentElement.parentElement.children[2].children.classList("float")
    //   document.querySelector(".cart-head span").innerHTML
    // );
    l = parseInt(l);
    b = parseInt(b);
    total = parseInt(total);
    totalItems = parseInt(totalItems);
    let cartcost = localStorage.getItem("totalCost");
    cartcost = JSON.parse(cartcost);
    let cartitem = localStorage.getItem("productsCart");
    cartitem = JSON.parse(cartitem);
    if (l < 10 && b) {
      l++;
      e.target.parentElement.children[1].innerHTML = l;
      Object.values(cartitem).map((item) => {
        // console.log(cartitem[5]);
        e.target.parentElement.parentElement.children[4].children[0].innerHTML =
          item.price + b + ".00";
        document.querySelector(".float2").innerHTML = total + item.price;
        document.querySelector(".cart-head span").innerHTML =
          totalItems + 1 + " items";
      });
    }
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
    let totalItems = document
      .querySelector(".cart-head span")
      .innerHTML.replaceAll("items", "");
    l = parseInt(l);
    b = parseInt(b);
    total = parseInt(total);
    totalItems = parseInt(totalItems);
    let cartitem = localStorage.getItem("productsCart");
    cartitem = JSON.parse(cartitem);
    if (l > 1 && b) {
      l--;
      e.target.parentElement.children[1].innerHTML = l;
      Object.values(cartitem).map((item) => {
        e.target.parentElement.parentElement.children[4].children[0].innerHTML =
          b - item.price + ".00";
        document.querySelector(".float2").innerHTML = total - item.price;
        document.querySelector(".cart-head span").innerHTML =
          totalItems - 1 + " items";
      });
    }
    if (l == 0) {
      alert("You have to select atlease one item");
    }
  });
});
//--------------------------------------------------extra events--------------------------------------------------

// $(document).ready(function () {
//   $("#cross-sign").click(function () {
//     $(".basket-remove").fadeOut("slow", function () {
//       $(".basket-remove").remove();
//     });
//   });
// });
