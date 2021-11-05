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
        res.render("pages/newproducts", {
            products: products,
            count: count,
        });
    });
});

router.get("/add-product", (req, res) => {
    var name = "";
    var price = "";

    res.render("admin/add_product", {
        name: name,
        price: price,
    });
});

// post add-product

router.post("/add-new-product", async (req, res) => {
    try {
        var imgFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
        req.checkBody("name", "Name mush have a value.").notEmpty();
        req.checkBody("image", "image mush have a value.").isImage(imgFile);
        req.checkBody("price", "Phone mush have a value.").isDecimal();

        var name = req.body.name;
        var price = req.body.price;
        var errors = req.validationErrors();
        if (errors) {
            res.render("admin/add_product", {
                errors: errors,
                name: name,
                price: price,
            });
        }
        else {
            productForm.findOne({ name: name }, function (err, product) {
                if (product) {
                    req.flash("danger", "name already exists");
                    res.render("admin/add_product", {
                        errors: errors,
                        name: name,
                        price: price,
                    });
                } else {
                    var price2 = parseFloat(price).toFixed(2);
                    var product = new productForm({
                        name: name,
                        price: price2,
                        image: imgFile,
                    });
                    product.save(function (err) {
                        if (err) return console.log(err);

                        mkdirp("static/images/" + product._id, function (err) {
                            return console.log(err);
                        });

                        mkdirp("static/images/" + product._id + "/gallery", function (err) {
                            return console.log(err);
                        });

                        mkdirp("static/images/" + product._id + "/gallery/thumbs", function (err) {
                            return console.log(err);
                        }
                        );

                        if (imgFile != "") {
                            var productImage = req.files.image;
                            var path = "static/images" + product._id + "/" + imgFile;
                            productImage.mv(path, function (err) {
                                return console.log(err);
                            });
                        }
                        req.flash("success", "product added");
                        res.redirect("admin/add_products");
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;