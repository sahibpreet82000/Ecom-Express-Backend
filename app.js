require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 80;
const mongoose = require("mongoose");
const mongoConnect = require("./db/models/database").mongoConnect;
const config = require("./config/database");
const Registers = require("./db/models/register");
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
const auth = require("./middleware/auth");
const fs = require("fs");
// var fileUpload = require("express-fileupload");
const fileUpload = require("./middleware/fileUpload");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeSecretKey);
const isLoggedIn = require("./helpers/isLoggedIn");
const app = express();

// Initializing Mongoose

async function main() {
  await mongoose.connect(config.database);
}

main().catch((err) => console.log(err));

// EXPRESS FILES

app.use("/static", express.static("static"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookie());
// Ejs SPECIFIC STUFF

app.set("view engine", "ejs"); //Set the template engine as pug
app.set("views", path.join(__dirname, "views")); //Set VIews the directory

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// multer middleware
app.use(fileUpload);

// Express Session middleware

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Express messages middleware

app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Multer for image upload
// app.use(multer().single("image"));

// Set Global Routers
app.locals.errors = null;

// Set Routes

var pages = require("./routes/RegisterRoute");
app.use("/register", pages);

var contactpage = require("./routes/contactRoute");
app.use("/contact", contactpage);

var productpage = require("./routes/productRoute");
app.use("/admin", productpage);

// to get login form

app.get("/login", (req, res) => {
  res.render("pages/index", {
    isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
});
// to get home page

app.get("/", (req, res) => {
  res.render("pages/homepage", {
    isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
});

// to get product page

app.get("/product", (req, res) => {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("pages/product", {
        items: JSON.parse(data),
        isLoggedIn: isLoggedIn(req.cookies.jwt),
      });
    }
  });
});
// to get furniture page

app.get("/furniture", (req, res) => {
  fs.readFile("items.json", function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render("pages/product2", {
        items: JSON.parse(data),
        isLoggedIn: isLoggedIn(req.cookies.jwt),
      });
    }
  });
});

//testing

app.get("/display", (req, res) => {
  res.render("pages/display", {
    isLoggedIn: isLoggedIn(req.cookies.jwt),
  });
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

    res.cookie("jwt", token, {
      // expires: new Date(Date.now() + 5000000),
      httpOnly: true,
    });

    if (compare) {
      res.render("pages/homepage", {
        isLoggedIn: isLoggedIn(req.cookies.jwt),
      });
    } else {
      res.send("Username or Password invalid");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// logout page

app.get("/logout", auth, async (req, res) => {
  try {
    // for single logout
    req.user.tokens = req.user.tokens.filter((currentElem) => {
      return currentElem.token != req.token;
    });
    // logout for all devices

    //  req.user.tokens = [];

    res.clearCookie("jwt");
    await req.user.save();
    res.render("pages/index", {
      isLoggedIn: isLoggedIn(req.cookies.jwt),
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

// database connection

mongoConnect((client) => {
  console.log(client);

  // Start the Server
  app.listen(port, () => {
    console.log("the app is running");
  });
});
