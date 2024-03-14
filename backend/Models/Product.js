const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  prodName: { type: String, required: true },
  prodImage: { type: String, required: true },
  prodAddress: { type: String, required: true },
  prodDescription: { type: String, required: true },
  prodPrice: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
