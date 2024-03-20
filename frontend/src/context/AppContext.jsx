import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const myContext = createContext();

const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState();

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
        `https://kiit-eats-backend.vercel.app/api/products?campusAddress=${campusAddress}`
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
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart) {
      setCart(storedCart);
      setCartLength(storedCart.length);
    }
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ***** Get all cart items in local storage
  const fetchCart = async () => {
    try {
      const response = await axios.get("https://kiit-eats-backend.vercel.app/api/cart", {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data.cart);
      updateCartInLocalStorage(response.data.cart);
      setCartLength(response.data.cart.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Function to increase the quantity and update total price
  const increaseQuantity = () => {
    if (!products || typeof products !== "object") {
      console.error("Products is not a valid object:", products);
      return;
    }

    let updatedProducts = {};
    let updatedQuantity = products.quantity + 1;
    let updatedPrice = updatedQuantity * products.prodPrice;
    updatedProducts = {
      ...products,
      quantity: updatedQuantity,
      totalPrice: updatedPrice,
    };

    setProducts(updatedProducts);
  };

  const decreaseQuantity = () => {
    if (!products || typeof products !== "object") {
      console.error("Products is not a valid object:", products);
      return;
    }

    let updatedProducts = {};
    let updatedQuantity = 1;
    let updatedPrice;

    if (products.quantity === 1) {
      updatedPrice = products.prodPrice;
      updatedQuantity = products.quantity;
    } else {
      updatedQuantity = products.quantity - 1;
      updatedPrice = updatedQuantity * products.prodPrice;
      updatedProducts = {
        ...products,
        quantity: updatedQuantity,
        totalPrice: updatedPrice,
      };
      setProducts(updatedProducts);
    }
  };

  // ***** Add to the cart list
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "https://kiit-eats-backend.vercel.app/api/cart",
        {
          productId,
          quantity,
        },
        {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
      alert("Product added to cart");
    } catch (error) {
      alert("Error adding product to cart");
    }
  };

  // ***** Remove an item from the cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`https://kiit-eats-backend.vercel.app/api/cart/${id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      updateCartInLocalStorage(updatedCart);
      setCartLength(updatedCart.length);
      fetchCart();
      alert("Product removed from cart");
    } catch (error) {
      alert("Error removing product from cart");
    }
  };

  // ***** Update an item from the cart
  // const updateCartItem = async (userId, productId, quantity) => {
  //   try {
  //     await axios.put(`https://kiit-eats-backend.vercel.app/api/cart/${userId}/${productId}`, {
  //       quantity,
  //     });
  //     const updatedCart = cart.map((item) => {
  //       if (item.productId === productId) {
  //         return { ...item, quantity };
  //       }
  //       return item;
  //     });
  //     updateCartInLocalStorage(updatedCart);
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //   }
  // };

  
  // ********************SEARCH THE PRODUCTS**********************
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async (campusAddress) => {
    try {
      const response = await fetch(
        `https://kiit-eats-backend.vercel.app/api/products?campusAddress=${campusAddress}`
      );
      if(response.ok){
        const data = await response.json()
        setSearchResults(data)
      }else{
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
    }
  };
    const handleSearchSubmit = async () => {
      if(!searchInput) return;
      await handleSearch(searchInput);
      setSearchInput("");
    };


  // ********************RETUN STATEMENT**********************
  return (
    <myContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        isLoggedIn,
        login,
        logout,
        setCart,
        cart,
        addToCart,
        fetchCart,
        removeFromCart,
        cartLength,
        setCartLength,
        // updateCartItem,
        decreaseQuantity,
        increaseQuantity,
        handleSearch,
        searchResults,
        searchInput,
        setSearchInput,
        handleSearchSubmit,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ContextProvider;
