const express = require("express");
const router = express.Router();

// product model
const Product = require("../db/models/product");
const isLoggedIn = require("../helpers/isLoggedIn");


// add new product

router.get("/add-product", (req, res) => {
  var name = "";
  var price = "";
  var image = "";
  res.render("admin/add_product", {
    name: name,
    price: price,
    image: image,
		isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
});

router.get("/", (req, res) => {
  var count;

  Product.find(function (err, products) {
    if (err) console.log(err);

    res.render("admin/products", {
      products: products,
      count: count,
			isLoggedIn: isLoggedIn(req.cookies.jwt),
    });
  });
});

// post add-product

router.post("/add-new-product", async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const images = [];

    req.files.forEach((img) => {
      images.push(img.path);
    });

    const product = await Product.create({
      name: name,
      price: price,
      image: images,
    });

    res.redirect("/admin/all-products");
  } catch (error) {
    console.log(error);
  }
});

router.get("/all-products", async (req, res) => {
  const allProducts = await Product.find();

  res.render("admin/products", {
    products: allProducts,
		isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
});

module.exports = router;
