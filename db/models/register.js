const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const registerationSchema = new mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  confirmpassword: { type: String, require: true },
});

registerationSchema.pre("save", async function(next){

 if(this.isModified("password")){   
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmpassword = undefined;
 }
 next(); 
})

const registerSchema = mongoose.model("registerations", registerationSchema);
module.exports = registerSchema;
