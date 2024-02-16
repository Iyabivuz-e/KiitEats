const db = require("../Database/database");

// ***********GET ALL PRODUCTS**********
const getAllProducts = async (req, res) => {
  try {
    await db.query("USE KiitEats");

    let query = "SELECT * FROM product";

    if (req.query.campusAddress) {
      query += " WHERE prodAddress = ?";
    }

    const [products] = await db.query(query, [req.query.campusAddress]);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ***********GET A SINGLE PRODUCT**********
const getSingleProduct = async (req, res) => {
  try {
    const prodId = req.params.id;

    if (!prodId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const [product] = await db.query("SELECT * FROM product WHERE id = ?", [
      prodId,
    ]);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ***********ADD A PRODUCT**********
const addProduct = async (req, res) => {
  try {
    // Validate that all required fields are provided
    const { prodName, prodImage, prodAddress, prodDescription, prodPrice } =
      req.body;
    if (
      !prodName ||
      !prodImage ||
      !prodAddress ||
      !prodDescription ||
      !prodPrice
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all product details" });
    }

    // No need to explicitly use the database
    const [result] = await db.query(
      "INSERT INTO product(prodName, prodImage, prodAddress, prodDescription, prodPrice) VALUES (?, ?, ?, ?, ?)",
      [prodName, prodImage, prodAddress, prodDescription, prodPrice]
    );

    res.status(200).json({ message: "A product has been added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// ***********DELETE A PRODUCT**********
const deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.id;

    await db.query("USE KiitEats");

    const [result] = await db.query("DELETE FROM product WHERE id = ?", [
      prodId,
    ]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ***********UPDATE A PRODUCT**********
const updateProduct = async (req, res) => {
  try {
    // Validate that prodName is provided
    if (!req.body.prodName) {
      return res.status(400).json({ message: "Product name is required" });
    }

    await db.query("USE KiitEats");

    const [result] = await db.query(
      "UPDATE product SET prodName = ? WHERE id = ?",
      [req.body.prodName, req.params.id]
    );

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
