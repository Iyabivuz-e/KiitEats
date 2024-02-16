import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar/Navbar";
import Product from "./components/Product/Product";

function App() {
  // const [isLoggedIn, setIsLoggedIn] =useState(true);

  return (
    <div className="h-full">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu/:campusAddress" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
