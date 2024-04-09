import Navbar from "./components/Navbar";
import "./App.css";
import VerticalNav from "./components/VerticalNav";
import ShowProducts from "./components/products/ShowProducts";
import AddProduct from "./components/products/AddProduct";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useState } from "react";
import Home from "./components/Home";
import Orders from "./components/Orders/Orders";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="flex">
      <VerticalNav />
      <div className="flex-1">
        <Navbar isLogged={isLogged} />
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route
            path="/login"
            element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
          <Route path="/products" element={<ShowProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
