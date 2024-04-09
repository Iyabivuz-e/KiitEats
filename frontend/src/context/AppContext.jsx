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
      const response = await axios.get("http://localhost:5000/api/cart", {
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
        "http://localhost:5000/api/cart",
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
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
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
  //     await axios.put(`http://localhost:5000/api/cart/${userId}/${productId}`, {
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
        `http://localhost:5000/api/products?campusAddress=${campusAddress}`
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


    //Stripe payment
    const [stripePayment, setStripePayment] = useState();
    const makePayment = (token) => {
      setStripePayment(token);
    };

    useEffect(() => {
      const payment = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/stripe/payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                source: stripePayment.id,
                totalPrice: products.totalPrice * 100, // Assuming products is properly set
              }),
            }
          );

          if (response.ok) {
            const result = await response.json();
            alert("Payment successful");
            console.log("RESPONSE:", result);
          } else {
            alert("Payment failed");
            console.log("ERROR:", response.json());
          }
        } catch (error) {
          alert("Payment failed");
          console.error("ERROR:", error);
        }
      };
      stripePayment && payment();
    }, [stripePayment]);

    // const makePayment = async (token) => {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:5000/api/stripe/payment",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           tokenId: token.id,
    //           totalPrice: products.totalPrice * 100,
    //         }),
    //       }
    //     );

    //     if (response.ok) {
    //       const result = await response.json();
    //       // Call createOrder API with the necessary order details
    //       await createOrder({
    //         products: products.map((product) => ({
    //           product: product._id,
    //           quantity: 1,
    //         })),
    //         totalAmount: products.totalPrice,
    //         customerName: name, // Replace with actual customer name
    //         customerEmail: email, // Replace with actual customer email
    //         shippingAddress: address, // Replace with actual shipping address
    //       });
    //       alert("Payment successful");
    //       console.log("RESPONSE:", result);
    //     } else {
    //       alert("Payment failed");
    //       console.log("ERROR:", response.json());
    //     }
    //   } catch (error) {
    //     alert("Payment failed");
    //     console.error("ERROR:", error);
    //   }
    // };


    // Logout
    const myLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    };


    //HandleBuyNow for orders...
    

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
        myLogout,
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
        stripePayment,
        makePayment,
        setStripePayment,
        
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ContextProvider;
