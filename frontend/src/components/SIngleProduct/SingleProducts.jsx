import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";

const SingleProducts = () => {
  const { id } = useParams();
  const [food, setFood] = useState();
  console.log(food)

useEffect(() => {
  // Fetch food details based on id
  const fetchFoodDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setFood(data);
      console.log(data.prodName)
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  fetchFoodDetails();
}, [id]);

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{food.prodName}</h1>
      <p>{food.prodDescription}</p>
      {/* Display other product details as needed */}
    </div>
  );
};

export default SingleProducts;
