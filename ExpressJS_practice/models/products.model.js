const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  email: String,
  images: String,
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;