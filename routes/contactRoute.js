const express = require("express");
const router = express.Router();

// contact model
const contactForm = require("../db/models/contact");
const isLoggedIn = require("../helpers/isLoggedIn");

// To get contact page

router.get("/", (req, res) => {
  var name = "";
  var email = "";
  var phone = "";

  res.render("pages/contact", {
    name: name,
    email: email,
    phone: phone,
    isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
});

// For contact form submission

router.post("/contact", async (req, res) => {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    const UserData = contactForm.create({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
    res.status(201).send("thanks for your valuable feedback");
  } catch (error) {
    res.status(500).send(error);
  }
});

//Export

module.exports = router;
