import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const myContext = createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState();
  // const [counter, setCounter] = useState(1);
  // const [carts, setCarts] = useState([]);

  // ********************LOGIN/LOGOUT**********************
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    
  };

  // ********************PRODUCTS**********************
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

  // ********************CART**********************
  // const [cart, setCart] = useState({});

  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0)
  // console.log(cart.length)

  //*****Initial store */
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart) {
      setCart(storedCart);
      setCartLength(storedCart.length); // Update cart length
    }
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data.cart);
      updateCartInLocalStorage(response.data.cart); // Update local storage with fetched cart items
      setCartLength(response.data.cart.length); // Update cart length
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };


  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`, // Send JWT token in the Authorization header
          },
        }
      );
      fetchCart(); // Refresh cart after adding product
      alert("Product added to cart");
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // ********************RETUN STATEMENT**********************
  return (
    <myContext.Provider
      value={{
        products,
        fetchProducts,
        isLoggedIn,
        login,
        logout,
        setCart,
        cart,
        addToCart,
        fetchCart,
        cartLength,
        setCartLength,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ContextProvider;
