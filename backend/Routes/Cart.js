const router = require("express").Router();
const { verifyToken } = require("../Middleware/JWT");
const {
  getUserCart,
  addToCart,
  updateCart,
  removeFromCart,
  // getCart,
} = require("../Controllers/Cart");

// Get All the cart items
router.get("/",verifyToken, getUserCart);

// Get a single cart Item
// router.get("/:id", getCart);

// Add to cart
router.post("/",verifyToken, addToCart);

// Delete the cart product
router.delete("/:id",verifyToken, removeFromCart);

// Update the cart product
router.put("/:id",verifyToken, updateCart);

module.exports = router;
