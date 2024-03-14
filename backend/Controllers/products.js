
const Product = require("../Models/Product");

// Get all products
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


// Get a single product
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


// Add a product
const addProduct = async (req, res) => {
  try {
    const prodName = req.body.prodName;
    const prodAddress = req.body.prodAddress;
    const prodDescription = req.body.prodDescription;
    const prodPrice = req.body.prodPrice;
    const prodImage = req.body.prodImage;
    // Check if all required fields are provided
    if (!prodName || !prodAddress || !prodDescription || !prodPrice || !prodImage) {
      return res.status(400).json({ message: "Please provide all product details" });
    }

    // Create a new Product instance
    const newProduct = new Product({
      prodName,
      prodImage,
      prodAddress,
      prodDescription,
      prodPrice,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Check if the product was successfully saved
    if (!savedProduct) {
      return res.status(500).json({ message: "Failed to save the product" });
    }

    res.status(201).json({ message: "A product has been added successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete a product
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

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { prodName, prodAddress, prodDescription, prodPrice } = req.body;

    // Validate that all required fields are provided
    if (!prodName || !prodAddress || !prodDescription || !prodPrice) {
      return res
        .status(400)
        .json({ message: "Please provide all product details" });
    }

    // Update the product in the database
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
