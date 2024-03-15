const Product = require("../Models/Product");
const Cart = require("../Models/Cart");

// ******************ADD TO CART*********************
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      cartItem.totalPrice = cartItem.quantity * product.prodPrice;
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      const totalPrice = product.prodPrice * quantity;
      cartItem = new Cart({
        userId,
        productId,
        quantity,
        totalPrice,
        productDetails: product.toObject(),
      });
    }

    await cartItem.save();

    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cartItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ******************GET USER CART*********************
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userCart = await Cart.find({ userId }).populate("productId");
    const cartLength = userCart.length;

    res.status(200).json({ success: true, cart: userCart, cartLength });
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ******************REMOVE FROM CART*********************
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ******************UPDATE THECART*********************
const updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const totalPrice = quantity * product.prodPrice;

    await Cart.findOneAndUpdate(
      { userId, productId },
      { quantity, totalPrice },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addToCart, getUserCart, removeFromCart, updateCart };
