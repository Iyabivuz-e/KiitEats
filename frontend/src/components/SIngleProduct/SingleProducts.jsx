import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../utilities/Loader";
import StripeCheckout from "react-stripe-checkout";
import { myContext } from "../../context/AppContext";
import axios from "axios";

const SingleProducts = ({ loading, setLoading }) => {
  // *****************CONTEXT API**********************
  const {
    isLoggedIn,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    products,
    setProducts,
    makePayment,
  } = useContext(myContext);
  const { id } = useParams();


  //****************FETCH SINGLE PRODUCT BY THEIR ID********************
  useEffect(() => {
    // Fetch food details based on id
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProducts(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
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
          src={products.prodImage}
          alt="product image"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4">
        <h1 className="text-2xl font-bold mb-3 mt-2">{products.prodName}</h1>
        <p>{products.prodDescription}</p>
        <p>&#8377;{products.prodPrice}</p>
        <div className="flex items-center gap-2">
          <p className="">Quantity: {products.quantity}</p>
          <button
            className="bg-transparent border-2 border-blue-600 rounded-md px-2 py-1"
            onClick={increaseQuantity}
          >
            +
          </button>
          <button
            className="bg-transparent border-2 border-orange-600 rounded-md px-2 py-1"
            onClick={decreaseQuantity}
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
                Buy Now for &#8377;{products.totalPrice}
              </Link>
              <Link
                to="/login"
                className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
              >
                Add To Cart
              </Link>
            </>
          ) : (
            <>
              <StripeCheckout
                redirectToCheckout
                name="KiitEats"
                description={` ${products.prodName} : Total Price: Rs.${products.totalPrice}`}
                stripeKey="pk_test_51OrxZNSD2wp2tswRa9uRElxaLNi9Z6og8VS2wmxHKKI6nI815NnXABIK6CrbhPfHx3lIwqX2J0nvqNaOa9nvst3B003j2uiwZd"
                token={makePayment}
                amount={products.totalPrice * 100}
                shippingAddress
                billingAddress
              >
                <button
                  to=""
                  className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
                >
                  Buy Now for &#8377; {products.totalPrice}
                </button>
              </StripeCheckout>
              <button
                onClick={() => addToCart(products._id, products.quantity)}
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
