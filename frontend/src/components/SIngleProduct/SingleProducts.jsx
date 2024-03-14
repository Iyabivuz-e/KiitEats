import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../utilities/Loader";
import StripeCheckout from "react-stripe-checkout";
import { myContext } from "../../context/AppContext";

const SingleProducts = ({
  counter,
  // handleCounterUp,
  // handleCounterDown,
  food,
  loading,
  setLoading,
  setFood,
  // totalPrice,
}) => {
  // Stripe Checkout functions
  const { isLoggedIn, addToCart } = useContext(myContext);

  const makePayment = async (token) => {
    const body = {
      product: {
        prodImage: food.prodImage,
        prodName: food.prodName,
        prodPrice: food.prodPrice,
      },
      token,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`http://localhost:5000/api/stripe/payment`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Payment successful");
        console.log("RESPONSE:", result);
      } else {
        const errorText = await response.text();
        alert("Payment failed");
        console.log("ERROR:", response.statusText);
        console.log("ERROR TEXT:", errorText);
      }
    } catch (error) {
      alert("Payment failed");
      console.log("ERROR:", error);
    }
  };

  const { id } = useParams();

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
        <h1 className="text-2xl font-bold mb-3 mt-2">{food.prodName}</h1>
        <p>{food.prodDescription}</p>
        <p>&#8377;{food.prodPrice}</p>
        <div className="flex items-center gap-2">
          <p className="">Quantity: {counter}</p>
          <button
            className="bg-transparent border-2 border-blue-600 rounded-md px-2 py-1"
            // onClick={handleCounterUp}
          >
            +
          </button>
          <button
            className="bg-transparent border-2 border-orange-600 rounded-md px-2 py-1"
            // onClick={handleCounterDown}
          >
            -
          </button>
        </div>
        <div className="flex justify-between gap-2">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
              >
                Buy Now for &#8377;{food.prodPrice}
              </Link>
              <Link
                to="/login"
                // onClick={() => addToCart(food, counter)}
                className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
              >
                Add To Cart
              </Link>
            </>
          ) : (
            <>
              <StripeCheckout
                stripeKey="pk_test_51OrxZNSD2wp2tswRa9uRElxaLNi9Z6og8VS2wmxHKKI6nI815NnXABIK6CrbhPfHx3lIwqX2J0nvqNaOa9nvst3B003j2uiwZd"
                token={makePayment}
                amount={food.prodPrice * 100}
                shippingAddress
                billingAddress
              >
                <button
                  to=""
                  className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
                >
                  Buy Now for &#8377;{food.prodPrice}
                </button>
              </StripeCheckout>
              <button
                onClick={() => addToCart(food._id, 1)}
                className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
              >
                Add To Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProducts;
