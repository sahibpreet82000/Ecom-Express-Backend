const express = require("express");
const router = express.Router();

// contact model
const contactForm = require("../db/models/contact");

// To get registration page

router.get("/", (req, res) => {
    var name = "";
    var email = "";
    var phone = "";
    
    res.render('pages/contact',{
      name: name,
      email: email,
      phone : phone
    })
  });


// For contact form submission


router.post("/contact", async(req,res)=>{
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


//Export

module.exports = router;