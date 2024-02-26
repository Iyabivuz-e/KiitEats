const db = require("../Database/database");

// Create a cart
const createCart = async (req, res) => {
  const {
    itemId,
    itemName,
    itemPrice,
    itemImage,
    itemDescription,
    quantity,
    totalPrice,
  } = req.body;
  const sql =
    "INSERT INTO cart (itemId, itemName, itemPrice, itemImage, itemDescription, quantity, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    itemId,
    itemName,
    itemPrice,
    itemImage,
    itemDescription,
    quantity,
    totalPrice,
  ];

  try {
    await db.query(sql, values);
    res.status(201).json({ message: "Cart created successfully" });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Error creating cart" });
  }
};

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const [carts] = await db.query("SELECT * FROM cart");
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error getting all carts:", error);
    res.status(500).json({ error: "Error getting all carts" });
  }
};

// Get a cart by ID
const getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const [cart] = await db.query("SELECT * FROM cart WHERE id = ?", [id]);
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
  const {
    itemId,
    itemName,
    itemPrice,
    itemImage,
    itemDescription,
    quantity,
    totalPrice,
  } = req.body;
  const sql =
    "UPDATE cart SET itemId = ?, itemName = ?, itemPrice = ?, itemImage = ?, itemDescription = ?, quantity = ?, totalPrice = ? WHERE id = ?";
  const values = [
    itemId,
    itemName,
    itemPrice,
    itemImage,
    itemDescription,
    quantity,
    totalPrice,
    id,
  ];

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

  try {
    await db.query("DELETE FROM cart WHERE id = ?", [id]);
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
