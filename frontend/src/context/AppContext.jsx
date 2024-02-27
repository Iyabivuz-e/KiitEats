import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const myContext = createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [counter, setCounter] = useState(1);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
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

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const addToCart = async (product, quantity) => {
    const totalPrice = parseFloat(product.prodPrice * counter);
    try {
      await axios.post("http://localhost:5000/api/cart", {
        itemId: product.id,
        itemName: product.prodName,
        itemPrice: product.prodPrice,
        totalPrice: totalPrice,
        itemImage: product.prodImage,
        itemDescription: product.prodDescription,
        quantity: quantity,
      });
      alert("Item added to cart successfully!");
      // Fetch updated cart data from the server
      fetchCartData();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      alert("Item deleted from cart successfully!");
      // Fetch updated cart data from the server
      fetchCartData();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      alert("Failed to delete item from cart. Please try again later.");
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart");
      setCarts(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleCounterUp = () => {
    setCounter(counter + 1);
  };

  const handleCounterDown = () => {
    if (counter > 1) setCounter(counter - 1);
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
        handleCounterUp,
        handleCounterDown,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ContextProvider;
