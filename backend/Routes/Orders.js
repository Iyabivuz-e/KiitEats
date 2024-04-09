const router = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} = require("../Controllers/Orders");

// Get All the cart items
router.get("/", getAllOrders);

// Get a single cart Item
router.get("/:id", getOrderById);

// Add to cart
router.post("/", createOrder);

// Delete the cart product
// router.delete("/:id", deleteOrder);

// Update the cart product
router.put("/:id", updateOrderStatus);

module.exports = router;
