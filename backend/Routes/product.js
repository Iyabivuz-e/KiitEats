// const multer = require("multer");
const router = require("express").Router();
const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../Controllers/products");

// Get All the product
router.get("/", getAllProducts);

// Get a single product
router.get("/:id", getSingleProduct);

// Add a product
router.post("/", addProduct);

// Delete the product
router.delete("/:id", deleteProduct);
// Update the product
router.put("/:id", updateProduct);

module.exports = router;
