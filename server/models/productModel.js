const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedprice: {
        type: Number
    },
    stock: {
        type: Number,
        required: true
    },
  
})

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;