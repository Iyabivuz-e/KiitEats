import { createContext, useState, useEffect } from "react";

export const myContext = createContext();

const ContextProvider = ({ children }) => {
  //***********CALLING THE APIs FOR THE PRODUCT BASED ON THE FOOD COURT CLICKED************** */
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

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

  return (
    <myContext.Provider
      value={{ products, fetchProducts, isLoggedIn, login, logout }}
    >
      {children}
    </myContext.Provider>
  );
};
export default ContextProvider;
