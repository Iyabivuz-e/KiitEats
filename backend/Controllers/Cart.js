const db = require("../Database/database");

// Create a cart
const createCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const sql = "INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)";
  const values = [userId, productId, quantity];

  try {
    await db.query(sql, values);
    res.status(200).json({ message: "Cart created successfully" });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Error creating cart" });
  }
};

// Get all carts
const getAllCarts = async (req, res) => {
  const sql = "SELECT * FROM cart";

  try {
    const [carts] = await db.query(sql);
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error getting all carts:", error);
    res.status(500).json({ error: "Error getting all carts" });
  }
};

// Get a cart by ID
const getCart = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cart WHERE id = ?";
  const values = [id];

  try {
    const [cart] = await db.query(sql, values);
    if (cart.length === 0) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      res.status(200).json(cart[0]);
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ error: "Error getting cart" });
  }
};

// Update a cart
const updateCart = async (req, res) => {
  const { id } = req.params;
  const { userId, productId, quantity } = req.body;
  const sql =
    "UPDATE cart SET userId = ?, productId = ?, quantity = ? WHERE id = ?";
  const values = [userId, productId, quantity, id];

  try {
    await db.query(sql, values);
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Error updating cart" });
  }
};

// Delete a cart
const deleteCart = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cart WHERE id = ?";
  const values = [id];

  try {
    await db.query(sql, values);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ error: "Error deleting cart" });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCart,
  updateCart,
  deleteCart,
};
