const router = require("express").Router();
const {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../Controllers/Orders");

// Get All the cart items
router.get("/", getAllOrder);

// Get a single cart Item
router.get("/:id", getOrder);

// Add to cart
router.post("/", createOrder);

// Delete the cart product
router.delete("/:id", deleteOrder);

// Update the cart product
router.put("/:id", updateOrder);

module.exports = router;
