import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../utilities/Loader";
import {myContext} from "../../context/AppContext";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { counter, carts, setCarts, handleDelete} = useContext(myContext);
  console.log(counter)

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
      <h1 className="text-3xl font-semibold mb-6">Cart Items</h1>
      {carts.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul>
          {carts.map((cart) => (
            <li key={cart.id} className="border-b py-4">
              <p>{cart.itemName}</p>
              <p>&#8377;{cart.itemPrice}</p>
              <p>{cart.itemDescription}</p>
              <p>{cart.quantity}</p>
              <p>{cart.totalPrice}</p>
              <button
                onClick={() => handleDelete(cart.id)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
