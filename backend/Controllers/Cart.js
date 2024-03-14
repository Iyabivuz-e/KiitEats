// const { Product, Cart } = require("../Models");
const Product = require("../Models/Product");
const Cart = require("../Models/Cart");
// const Session = require("../Models/Sessions"); // Import Session model

// Function to add a product to the cart with validations and error handling
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Fetch the product details from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // console.log(req.user.userId)
    // Add new item to user's cart
    const cartItem = new Cart({
      userId: req.user.userId,
      productId,
      quantity,
      productDetails: product.toObject(),
    })

    await cartItem.save();
    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cartItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to retrieve the current user's cart
const getUserCart = async (req, res) => {
  try {
    // Retrieve userId from the authenticated user session
    const userId = req.user.userId;

    // Retrieve user's cart using the userId
    const userCart = await Cart.find({ userId }).populate("productId");
    const cartLength = userCart.length
    // console.log(cartLength)

    res.status(200).json({ success: true, cart: userCart,cartLength});
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Function to delete a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Remove product from user's cart
    await Cart.findOneAndDelete({ userId, productId });

    res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to update the quantity of a product in the cart
const updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    // Update product quantity in user's cart
    await Cart.findOneAndUpdate(
      { userId, productId },
      { quantity },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addToCart, getUserCart, removeFromCart, updateCart };
