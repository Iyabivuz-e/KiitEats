import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="p-3 border rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="h-40 sm:h-60 lg:h-50">
        <img
          src={product.prodImage}
          alt="product image"
          className="rounded-lg h-full w-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between mb-2">
          <p className="text-lg text-grey-800">{product.prodName}</p>
          <p className="text-lg text-orange-600">&#8377;{product.prodPrice}</p>
        </div>
        <p className="text-lg">{product.prodDescription}</p>
        <p className="text-sm">&#8377;{product.prodPrice}</p>
        <p className="text-sm">Location: {product.prodAddress}</p>
      </div>
      <div className="p-3 flex justify-between gap-2">
        <Link
          to=""
          className="py-1 px-3 bg-transparent border-2 border-red-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-blue-700 text-center"
        >
          Delete
        </Link>
        <Link
          to="/update-product"
          className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:text-blue-700 text-center"
        >
          Update
        </Link>
      </div>
    </div>
  );
};

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <Link
          to="/add-product"
          className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-blue-700 text-center "
        >
          Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
