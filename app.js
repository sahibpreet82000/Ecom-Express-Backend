const express = require("express");
const path = require("path");
const app = express();
const port = 80;

//EXPRESS FILES
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
// app.set('view engine','pug') //Set the template engine as pug
app.set('views',path.join(__dirname,'views')) //Set VIews the directory

//End point

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/html/register.html'));
})

app.post('/register',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/html/register.html'));
  console.log(req.body);
})
//Start the Server

app.listen(port,()=>{
    console.log("the app is running");
})