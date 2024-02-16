import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { campusAddress } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products?campusAddress=${campusAddress}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log(data)
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [campusAddress]);

  return (
    <div>
      <h1>Products available at {campusAddress}</h1>
      {products.length === 0 ? (
        <div>No product is found at {campusAddress}</div>
      ) : (
        
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>Name: {product.prodName}</p>
              <p>Location: {product.prodAddress}</p>
              <p>Description: {product.prodDescription}</p>
              <p>Price: ${product.prodPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Product;
