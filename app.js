require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const mongoose = require("mongoose");
const config = require("./config/database")
const Registers = require("./db/models/register");
const contactForm = require("./db/models/contact");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
var  bodyParser = require("body-parser");
var session = require("express-session");
var expressValidator = require("express-validator");
const auth = require("./middleware/auth")

// Initializing Mongoose

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(config.database);
}

// EXPRESS FILES

app.use("/static", express.static("static"));
app.use(express.urlencoded({extended:false}));
app.use(cookie());
app.use(expressValidator());  // validator added
// Ejs SPECIFIC STUFF

app.set('view engine','ejs') //Set the template engine as pug
app.set("views", path.join(__dirname, "views")); //Set VIews the directory

// Set Global Routers 
app.locals.errors = null;

// Set Routes

var pages = require("./routes/pages");
app.use('/',pages);

var contactpage = require("./routes/contactRoute");
app.use('/contact',contactpage);

// Body parser middleware

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

// Express Session middleware

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


// Express messages middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// to get login form

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/html/register.html"));
});

// logout page

app.get("/logout", auth ,async(req, res) => {
  try{
    // for single logout
    req.user.tokens = req.user.tokens.filter((currentElem)=>{
           return currentElem.token != req.token
    })
   // logout for all devices

      //  req.user.tokens = [];

    res.clearCookie("jwt");
    await req.user.save();
    res.render("pages/index");
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
      await registerNewUser.save();

      res.render("pages/homepage");
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
    res.render('pages/homepage');
    } else {
      res.send("Username or Password invalid");
    }   
  } catch (error) {
    res.status(400).send(error);
  }
});

//

app.post("/contact", async(req,res)=>{
  try{
    req.checkBody('name', 'Name mush have a value.').notEmpty();
    req.checkBody('email', 'Email mush have a value.').notEmpty();
    req.checkBody('phone', 'Phone mush have a value.').notEmpty();
  
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    
      const UserData = new contactForm(req.body);
      await UserData.save();
      var errors = req.validationErrors();
      if(errors){
        res.render('pages/contact',{
          errors: errors,
          name : name,
          email : email,
          phone :phone
        })
      }
      else{
        res.status(201).send("thanks for your valuable feedback");
      }
    }
    catch(error){
      res.status(500).send(error);
    }
})

// Start the Server

app.listen(port, () => {
  console.log("the app is running");
});


