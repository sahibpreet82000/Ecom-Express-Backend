require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const mongoose = require("mongoose");
const Registers = require("./db/models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const auth = require("./middleware/auth")
// Initializing Mongoose

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/registeration");
}

// EXPRESS FILES

app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.use(cookie());
// PUG SPECIFIC STUFF

// app.set('view engine','pug') //Set the template engine as pug
app.set("views", path.join(__dirname, "views")); //Set VIews the directory

// End point

// To get registration page

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/homepage.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/html/register.html"));
});

// To get Login page

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/html/index.html"));
});

// logout page

app.get("/logout", auth ,async(req, res) => {
  try{
    //for single logout
    // req.user.tokens = req.user.tokens.filter((currentElem)=>{
    //        return currentElem.token != req.token
    // })

       // logout for all devices
       req.user.tokens = [];
    res.clearCookie("jwt");
    await req.user.save();
    res.sendFile(path.join(__dirname + "/static/index.html"));
  }
  catch(error){
    res.status(404).send(error);
  }
});


// To post Registred Form

app.post("/register", async (req, res) => {
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
      res.cookie("jwt",token, {
        expires: new Date(Date.now()+30000),
        httpOnly:true 
      })
      const registered = await registerNewUser.save();
      res.status(201).sendFile(path.join(__dirname + "/static/homepage.html"));
    } else {
      res.send("passsword are not matching");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// To post Login Form

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const UserEmail = await Registers.findOne({ email: email });
    const compare = await bcrypt.compare(password, UserEmail.password);
    const token = await UserEmail.generateAuthToken();

  // Storing cookie

    res.cookie("jwt",token, {
      expires: new Date(Date.now()+500000),
      httpOnly:true 
    })

    if (compare) {
      res.status(201).sendFile(path.join(__dirname + "/static/homepage.html"));
    } else {
      res.send("Username or Password invalid");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start the Server

app.listen(port, () => {
  console.log("the app is running");
});
