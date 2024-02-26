import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../utilities/Loader";
import {myContext} from "../../context/AppContext"

const SingleProducts = () => {
  const { id } = useParams();
  const [food, setFood] = useState();
  const [loading, setLoading] = useState(true);
  const { addToCart, counter } = useContext(myContext);

  const handleCounts = () => {
    console.log("handleCounts");
  };

  useEffect(() => {
    // Fetch food details based on id
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setFood(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-10 p-4 px-6lg:p-0 lg:flex justify-center items-center gap-4">
      <div className="w-full lg:w-1/2">
        <img
          src={food.prodImage}
          alt="product image"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4">
        <h1 className="text-2xl font-bold mb-4">{food.prodName}</h1>
        <p>{food.prodDescription}</p>
        <p>&#8377;{food.prodPrice}</p>
        <div className="flex items-center gap-2">
          <p className="">Quantity: {counter}</p>
          <button
            className="bg-transparent border-2 border-blue-600 rounded-md px-2 py-1"
            onClick={handleCounts}
          >
            +
          </button>
          <button
            className="bg-transparent border-2 border-orange-600 rounded-md px-2 py-1"
            onClick={handleCounts}
          >
            -
          </button>
        </div>
        <div className="flex justify-between gap-2">
          <Link
            to=""
            className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
          >
            Buy Now
          </Link>
          <button
            onClick={() => addToCart(food)}
            className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProducts;
