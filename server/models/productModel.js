const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedprice: {
    type: Number,
    default: null, 
  },
  stock: {
    type: Number,
    required: true,
    min: 0, 
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
