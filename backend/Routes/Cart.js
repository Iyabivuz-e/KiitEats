const router = require("express").Router();
const {
 createCart,
  getAllCarts,
  getCart,
  updateCart,
  deleteCart,
} = require('../Controllers/Cart');

// Get All the cart items
router.get("/", getAllCarts);

// Get a single cart Item
router.get("/:id", getCart);

// Add to cart
router.post("/", createCart);

// Delete the cart product
router.delete("/:id", deleteCart);

// Update the cart product
router.put("/:id", updateCart);

module.exports = router;
