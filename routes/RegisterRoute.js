const express = require("express");
const router = express.Router();

// database model
const Registers = require("../db/models/register");
const isLoggedIn = require("../helpers/isLoggedIn");

// To get registration page

router.get("/", (req, res) => {
  res.render("pages/register", {
    isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
});

// To post Registred Form

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerNewUser = new Registers({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
      });
      // Hashing password

      const token = await registerNewUser.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      await registerNewUser.save();
      res.render("pages/homepage", {
        isLoggedIn: isLoggedIn(req.cookies.jwt),
      });
    } else {
      res.send("passsword are not matching");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
