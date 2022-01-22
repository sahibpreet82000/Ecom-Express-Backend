const express = require("express");
const router = express.Router();
const fsextra = require("fs-extra");
const mkdirp = require("mkdirp");
const resize = require("resize-img");

// contact model
const productForm = require("../db/models/product");

// product index

router.get("/", (req, res) => {
    var count;

    productForm.count(function (err, c) {
        count = c;
    });
    productForm.find(function (err, products) {
        if(err)
            console.log(err)
        
        res.render("admin/products", {
            products: products,
            count: count,
        });
    });
});

module.exports = router;
