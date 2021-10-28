const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:3,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  message: {
    type: String,
    required: true,
    minlength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// generating tokens

contactSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString()},process.env.SECRET);
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
  } 
  catch (error) {
    res.send(error);
  }
};

//converting password into hash

contactSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10) ;
  }
  next();
});

const registerSchema = mongoose.model("Contactform", contactSchema);
module.exports = registerSchema;
