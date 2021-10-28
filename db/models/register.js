const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const registerationSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength:3,
  },
  lastname: {
    type: String,
    required: true,
    minlength:3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmpassword: {
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

registerationSchema.methods.generateAuthToken = async function () {
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

registerationSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10) ;
  }
  next();
});

const registerSchema = mongoose.model("registerations", registerationSchema);
module.exports = registerSchema;
