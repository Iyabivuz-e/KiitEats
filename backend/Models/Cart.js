// Cart model (assuming you're using MongoDB with Mongoose)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Signup" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
