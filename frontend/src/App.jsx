import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar/Navbar";
import Product from "./components/Product/Product";
import ContextProvider from "./context/AppContext";
import SingleProducts from "./components/SIngleProduct/SingleProducts";

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
            <Route path="/menu/foods/:id" element={<SingleProducts />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
