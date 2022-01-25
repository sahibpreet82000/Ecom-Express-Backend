const express = require("express");
const router = express.Router();
const fsextra = require("fs-extra");
const mkdirp = require("mkdirp");
const resize = require("resize-img");
const multer = require("multer");
const mongoose = require("mongoose");

// contact model
const productForm = require("../db/models/product");

// add new product

router.get("/add-product", (req, res) => {
  var name = "";
  var price = "";
  var image = "";
  res.render("admin/add_product", {
    name: name,
    price: price,
    image: image,
  });
});

router.get("/", (req, res) => {
  var count;

  productForm.find(function (err, products) {
    if (err) console.log(err);

    res.render("admin/products", {
      products: products,
      count: count,
    });
  });
});

// post add-product

router.post("/add-new-product", async (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;

  console.log(name);
  console.log(price);
  console.log(image);

  // var product = new productForm({
  //   name: name,
  //   price: price,
  //   image: image,
  // });
  // product.save().catch((err) => {

  //   const error = new Error(err);
  //   error.httpStatusCode = 500;
  //   return next(error);
  // });
  // res.redirect("/admin/newproducts");
});

module.exports = router;
