import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import Footer from "./components/Home/Footer/Footer";
import Menu from "./components/Menu/Menu";
import FCourts from "./components/Home/FCourts/FCourts";
import Loader from "./utilities/Loader";
import SearchFood from "./components/searchFood/SearchFood";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="h-full">
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu/:campusAddress" element={<Product />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/search/:campusAddress" element={<SearchFood />} />
            <Route
              path="/foods/:id"
              element={
                <SingleProducts loading={loading} setLoading={setLoading} />
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/food_courts"
              element={<FCourts loading={loading} setLoading={setLoading} />}
            />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
