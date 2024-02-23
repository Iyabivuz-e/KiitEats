import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [prodImage, setProdImage] = useState(null);
  const [prodName, setProdName] = useState("");
  const [prodAddress, setProdAddress] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setProdImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("prodImage", prodImage); // Ensure prodImage is correctly set

      // Append other form data fields
      formData.append("prodName", prodName);
      formData.append("prodAddress", prodAddress);
      formData.append("prodDescription", prodDescription);
      formData.append("prodPrice", prodPrice);

      // Send formData to the backend
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("A product has been added successfully");
    } catch (error) {
      console.error(error);
      setMessage("Internal server error");
    }
  };


  return (
    <div className="max-w-lg mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Add a Product</h2>
      {message && (
        <p className="bg-green-200 text-green-800 rounded p-2 mb-4">
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="prodName" className="block mb-2 font-bold">
            Product Name:
          </label>
          <input
            type="text"
            id="prodName"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prodAddress" className="block mb-2 font-bold">
            Product Address:
          </label>
          <input
            type="text"
            id="prodAddress"
            value={prodAddress}
            onChange={(e) => setProdAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prodDescription" className="block mb-2 font-bold">
            Product Description:
          </label>
          <textarea
            id="prodDescription"
            value={prodDescription}
            onChange={(e) => setProdDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prodPrice" className="block mb-2 font-bold">
            Product Price:
          </label>
          <input
            type="number"
            id="prodPrice"
            value={prodPrice}
            onChange={(e) => setProdPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block mb-2 font-bold">
            Product Image:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
