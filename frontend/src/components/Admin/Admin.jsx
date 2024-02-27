import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [prodName, setProdName] = useState("");
  const [prodAddress, setProdAddress] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodImage, setProdImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("prodName", prodName);
      formData.append("prodAddress", prodAddress);
      formData.append("prodDescription", prodDescription);
      formData.append("prodPrice", prodPrice);
      formData.append("prodImage", prodImage);

      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prodName">Product Name:</label>
          <input
            type="text"
            id="prodName"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prodAddress">Product Address:</label>
          <input
            type="text"
            id="prodAddress"
            value={prodAddress}
            onChange={(e) => setProdAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prodDescription">Product Description:</label>
          <textarea
            id="prodDescription"
            value={prodDescription}
            onChange={(e) => setProdDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prodPrice">Product Price:</label>
          <input
            type="text"
            id="prodPrice"
            value={prodPrice}
            onChange={(e) => setProdPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prodImage">Product Image:</label>
          <input
            type="file"
            id="prodImage"
            onChange={(e) => setProdImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Admin;
