import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar/Navbar";
// import Navbar from './components/Home/Navbar/Navbar';
// import Layout from './components/Layout/Layout';

function App() {
  // const [isLoggedIn, setIsLoggedIn] =useState(true);

  return (
    <div className="h-full">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
