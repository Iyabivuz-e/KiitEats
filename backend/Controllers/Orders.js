const db = require("../Database/database");

// Create a cart
const createOrder = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const sql =
    "INSERT INTO `order` (userId, productId, quantity) VALUES (?, ?, ?)";
  const values = [userId, productId, quantity];

  try {
    await db.query(sql, values);
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Get all carts
const getAllOrder = async (req, res) => {
  const sql = "SELECT * FROM `order`";

  try {
    const [orders] = await db.query(sql);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting all orders:", error);
    res.status(500).json({ error: "Error getting all orders" });
  }
};

// Get a cart by ID
const getOrder = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `order` WHERE id = ?";
  const values = [id];

  try {
    const [order] = await db.query(sql, values);
    if (order.length === 0) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json(order[0]);
    }
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Error getting order" });
  }
};

// Update an order (only for admin)
const updateOrder = async (req, res) => {
  // Assuming you have a middleware to check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  const { id } = req.params;
  const { userId, productId, quantity } = req.body;
  const sql =
    "UPDATE `order` SET userId = ?, productId = ?, quantity = ? WHERE id = ?";
  const values = [userId, productId, quantity, id];

  try {
    await db.query(sql, values);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
};

// Delete an order (only for admin)
const deleteOrder = async (req, res) => {
  // Assuming you have a middleware to check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  const { id } = req.params;
  const sql = "DELETE FROM `order` WHERE id = ?";
  const values = [id];

  try {
    await db.query(sql, values);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Error deleting order" });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
