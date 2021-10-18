const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require("mongoose");

// Initializing Mongoose

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/registeration");
}

// mongoose Schema

const registerationSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  confirmpassword: String,
});
const registerSchema = mongoose.model("registerations", registerationSchema);

// EXPRESS FILES

app.use("/static", express.static("static"));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF

// app.set('view engine','pug') //Set the template engine as pug
app.set("views", path.join(__dirname, "views")); //Set VIews the directory

// End point

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/html/register.html"));
});

app.post("/register", (req, res) => {
  var myData = new registerSchema(req.body);
  myData.save().then(()=>{
      res.send("You are registered successfully")
  }).catch(()=>{
      res.status(404).send("Item was not saved");
  })
});

// Start the Server

app.listen(port, () => {
  console.log("the app is running");
});
