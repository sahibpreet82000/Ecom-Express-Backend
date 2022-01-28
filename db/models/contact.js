const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
  },
  message: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model("Contactform", contactSchema);
