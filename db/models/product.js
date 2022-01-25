const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const mongodb = require("mongodb");
const getDb = require("./database").getDb;

class Product {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }
  save() {
    const db = getDb();
       let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });  
 
     
  }
}

const products = mongoose.model("product", productSchema);
module.exports = products;
module.exports = Product;
