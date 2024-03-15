const Product = require("../Models/Product");

// ******************GET ALL PRODUCTS*********************
const getAllProducts = async (req, res) => {
  try {
    let query = {};

    if (req.query.campusAddress) {
      query.prodAddress = req.query.campusAddress;
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ******************GET A SINGLE PRODUCTS*********************
const getSingleProduct = async (req, res) => {
  try {
    const prodId = req.params.id;

    if (!prodId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(prodId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ******************ADD A PRODUCTS*********************
const addProduct = async (req, res) => {
  try {
    const { prodName, prodAddress, prodDescription, prodPrice, prodImage } =
      req.body;
    const newProduct = new Product({
      prodName,
      prodAddress,
      prodDescription,
      prodPrice,
      prodImage,
      quantity: 1,
      totalPrice: 0,
    });

    const savedProduct = await newProduct.save();

    if (!savedProduct) {
      return res.status(500).json({ message: "Failed to save the product" });
    }

    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ******************DELETE A PRODUCTS*********************
const deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.id;

    const result = await Product.findByIdAndDelete(prodId);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ******************UPDATE A PRODUCTS*********************
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { prodName, prodAddress, prodDescription, prodPrice } = req.body;

    if (!prodName || !prodAddress || !prodDescription || !prodPrice) {
      return res
        .status(400)
        .json({ message: "Please provide all product details" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        prodName,
        prodAddress,
        prodDescription,
        prodPrice,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
