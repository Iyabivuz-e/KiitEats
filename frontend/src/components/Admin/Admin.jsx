import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {
  const [productData, setProductData] = useState({
    prodName: "",
    prodAddress: "",
    prodDescription: "",
    prodPrice: "",
    prodImage: null,
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      prodImage: e.target.files[0],//****************/
    });
    console.log("Image:", e.target.files[0]);
    
  };

  useEffect(() => {
    console.log("Image in state:", productData.prodImage);
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("prodName", productData.prodName);
      formData.append("prodAddress", productData.prodAddress);
      formData.append("prodDescription", productData.prodDescription);
      formData.append("prodPrice", productData.prodPrice);
      formData.append("prodImage", productData.prodImage);

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again later.");
    }
  };


  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prodName" className="block font-semibold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            id="prodName"
            name="prodName"
            value={productData.prodName}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prodAddress" className="block font-semibold mb-2">
            Product Address:
          </label>
          <input
            type="text"
            id="prodAddress"
            name="prodAddress"
            value={productData.prodAddress}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prodDescription" className="block font-semibold mb-2">
            Product Description:
          </label>
          <textarea
            id="prodDescription"
            name="prodDescription"
            value={productData.prodDescription}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="prodPrice" className="block font-semibold mb-2">
            Product Price:
          </label>
          <input
            type="text"
            id="prodPrice"
            name="prodPrice"
            value={productData.prodPrice}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prodImage" className="block font-semibold mb-2">
            Product Image:
          </label>
          <input
            type="file"
            id="prodImage"
            name="prodImage"
            onChange={handleImageChange}
            // multiple
            className="border border-gray-400 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
