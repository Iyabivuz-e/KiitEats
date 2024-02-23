import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import campusImage from "../../assets/two.jpg";


const SingleProducts = () => {
  const { id } = useParams();
  const [food, setFood] = useState();

useEffect(() => {
  // Fetch food details based on id
  const fetchFoodDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setFood(data);
      console.log(data)
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
    <div className="w-[90%] m-auto py-5 px-4 bg-transparent rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex items-center gap-3">
      <div className="h-[230px]">
        <img
          src={campusImage}
          alt="product image"
          className="rounded-lg h-full w-full object-cover"
        />
      </div>
      <h1>{food.prodName}</h1>
      <p>{food.prodDescription}</p>
      {/* Display other product details as needed */}
    </div>
  );
};

export default SingleProducts;
