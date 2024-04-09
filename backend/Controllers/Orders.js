const Order = require("../Models/Orders");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if(!orders) {
      return res.status(404).json({ error: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      customerName,
      customerEmail,
      shippingAddress,
    } = req.body;
    const order = new Order({
      products,
      totalAmount,
      customerName,
      customerEmail,
      shippingAddress,
      status: "pending", // Set the initial status to "pending"
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Check if the provided status is one of the allowed values
    const allowedStatuses = ["pending", "paid", "shipped", "complete"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus };