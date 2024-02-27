import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar/Navbar";
import Product from "./components/Product/Product";
import ContextProvider from "./context/AppContext";
import SingleProducts from "./components/SIngleProduct/SingleProducts";
import Admin from "./components/Admin/Admin";
import Cart from "./components/cart/Cart";
// import UpdateProduct from "./components/Admin/UpdateProduct";

  function App() {

  return (
    <div className="h-full">
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu/:campusAddress" element={<Product />} />
            <Route path="/foods/:id" element={<SingleProducts />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/admin/:id" element={<UpdateProduct />} /> */}
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
