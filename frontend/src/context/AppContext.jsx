import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const myContext = createContext();

const ContextProvider = ({ children }) => {
  //***********CALLING THE APIs FOR THE PRODUCT BASED ON THE FOOD COURT CLICKED************** */
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [counter, setCounter] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);
  }, [isLoggedIn]);

  const fetchProducts = async (campusAddress) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?campusAddress=${campusAddress}`
      );
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

  //***********LOGGIN STUFF************** */
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  //***********ADD TO CART FUNCTIONALITIES************** *//
  const addToCart = async (product) => {
    console.log("Add to cart");
    const totalPrice = parseFloat(product.prodPrice * counter);
    try {
      // Send a POST request to your backend to add the item to the cart
      await axios.post("http://localhost:5000/api/cart", {
        itemId: product.id,
        itemName: product.prodName,
        itemPrice: product.prodPrice,
        totalPrice: totalPrice,
        itemImage: product.prodImage,
        itemDescription: product.prodDescription,
        quantity: counter,
      });
      alert("Item added to cart successfully!");
      // setCartItemCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Provide error feedback to the user if needed
      alert("Failed to add item to cart. Please try again later.");
    }
  };

  //***********DELETE FROM THE CART FUNCTIONALITIES************** *//
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your backend to delete the item from the cart
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      // Filter out the deleted item from the carts state
      const updatedCarts = carts.filter((cart) => cart.id !== id);
      setCarts(updatedCarts);
      alert("Item deleted from cart successfully!");
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      // Provide error feedback to the user if needed
      alert("Failed to delete item from cart. Please try again later.");
    }
  };

  return (
    <myContext.Provider
      value={{
        products,
        fetchProducts,
        isLoggedIn,
        login,
        logout,
        addToCart,
        counter,
        carts,
        setCarts,
        handleDelete,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
export default ContextProvider;
