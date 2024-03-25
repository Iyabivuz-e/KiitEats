import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {
  const [productData, setProductData] = useState({
    prodName: "",
    prodAddress: "",
    prodDescription: "",
    prodPrice: "",
    prodImage: "",
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
      prodImage: e.target.files[0],
    });
  };

  //   useEffect(() => {
  //     console.log("Image in state:", productData.prodImage);
  //   }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Products: ", productData);
    let responseData;
    let product = productData;

    let formData = new FormData();
    formData.append("product", productData.prodImage);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Accept: "Application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      product.prodImage = responseData.image_url;
      console.log("Product Image :",product.prodImage)

      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        // setProductData("")
    }
  };

  return (
    <div className="container mx-auto p-4 lg:w-1/2">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 pr-2">
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
          <div className="w-full md:w-1/2 pl-2">
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
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 pr-2">
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
          <div className="w-full md:w-1/2 pl-2">
            <label htmlFor="prodImage" className="block font-semibold mb-2">
              Product Image:
            </label>
            <input
              type="file"
              id="prodImage"
              name="prodImage"
              onChange={handleImageChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
