import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../utilities/Loader";
import { myContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { fetchCart, cart, setCart, removeFromCart, isLoggedIn, makePayment } = useContext(myContext);

  // ***********FETCHING THE CART*****************
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCart();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching the cart", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  // ***********RENDERING THE CART*****************
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center mt-7 text-blue-600">
        My Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-center">No items in the cart.</p>
      ) : (
        <ul className="flex flex-col items-center justify-center p-5">
          {cart.map((myCart) => (
            <li
              key={myCart._id}
              className="m-auto border-b py-4 w-full md:w-[90%] flex flex-col md:flex-row items-center md:items-start"
            >
              <div className="w-full md:w-[50%] md:mr-6">
                <img
                  src={myCart.productId.prodImage}
                  alt="Item Image"
                  className="w-full h-auto md:h-[250px] object-cover"
                />
              </div>
              <div className="w-full mt-4 md:w-[50%] md:mt-0">
                <p className="text-lg text-blue-600 font-semibold">
                  {myCart.productId.prodName}
                </p>
                <p className="text-lg mt-2 text-gray-600">
                  &#8377;{myCart.productId.prodPrice}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {myCart.productId.prodDescription}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  Location: {myCart.productId.prodAddress}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  Quantity: {myCart.quantity}
                </p>
                <p className="text-lg mt-2 text-gray-700">
                  Total: &#8377;{myCart.totalPrice}
                </p>
                <button
                  onClick={() => removeFromCart(myCart._id)}
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>

                <Link
                  to=""
                  className="bg-blue-500 text-white px-3 py-1 mt-2 rounded ml-3"
                >
                  <>
                    <StripeCheckout
                      redirectToCheckout
                      name="KiitEats"
                      description={` ${myCart.prodName} : Total Price: Rs.${myCart.totalPrice}`}
                      stripeKey="pk_test_51OrxZNSD2wp2tswRa9uRElxaLNi9Z6og8VS2wmxHKKI6nI815NnXABIK6CrbhPfHx3lIwqX2J0nvqNaOa9nvst3B003j2uiwZd"
                      token={makePayment}
                      amount={myCart.totalPrice * 100}
                      shippingAddress
                      billingAddress
                    >
                      <button
                        to=""
                        // className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
                      >
                        Buy Now for &#8377; {myCart.totalPrice}
                      </button>
                    </StripeCheckout>
                  </>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
