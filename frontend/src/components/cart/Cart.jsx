import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../utilities/Loader";
import { myContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { carts, setCarts, handleDelete } = useContext(myContext);

  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCarts(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCarts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center mt-7 text-blue-600">
        My Cart
      </h1>
      {carts.length === 0 ? (
        <p className="text-center">No items in the cart.</p>
      ) : (
        <ul className="flex flex-col items-center justify-center p-5">
          {carts.map((cart) => (
            <li
              key={cart.id}
              className="m-auto border-b py-4 w-full md:w-[90%] flex flex-col md:flex-row items-center md:items-start"
            >
              <div className="w-full md:w-[50%] md:mr-6">
                <img
                  src={cart.itemImage}
                  alt="Item Image"
                  className="w-full h-auto md:h-[250px] object-cover"
                />
              </div>
              <div className="w-full mt-4 md:w-[50%] md:mt-0">
                <p className="text-lg text-blue-600 font-semibold">
                  {cart.itemName}
                </p>
                <p className="text-lg mt-2 text-gray-600">
                  &#8377;{cart.itemPrice}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {cart.itemDescription}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  Quantity: {cart.quantity}
                </p>
                <p className="text-lg mt-2 text-gray-700">
                  Total: &#8377;{cart.totalPrice}
                </p>
                <button
                  onClick={() => handleDelete(cart.id)}
                  className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <Link
                  to=""
                  className="bg-blue-500 text-white px-3 py-1 mt-2 rounded ml-3"
                >
                  Buy Now
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
