const express = require("express");
const router = express.Router();
const fsextra = require("fs-extra");
const mkdirp = require("mkdirp");
const resize = require("resize-img");
const mongoose = require("mongoose");

// contact model
const productForm = require("../db/models/product");

// product index

router.get("/", (req, res) => {
  var count;

    res.render("admin/products", {
      count: count,
    });
});

module.exports = router;
