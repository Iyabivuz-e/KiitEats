import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../../../context/AppContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const { isLoggedIn, logout, cartLength } = useContext(myContext);
  // console.log()
  const [showLinks, setShowLinks] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 sticky top-0 z-[999] bg-[#d6e1e8] sm:flex sm:justify-between sm:items-center sm:px-6 lg:px-8">
      <div className="flex justify-between items-center px-4 py-4 sm:p-0">
        <div className="logo">
          <Link to="/">
            <h1 className="text-blue-600 font-semibold text-3xl">
              Kiit
              <span className="text-3xl font-bold text-orange-600">Eats</span>
            </h1>
          </Link>
        </div>

        <div className="sm:hidden">
          <button
            type="button"
            className="block text-blue-700 hover:text-orange-600 focus:text-orange-600 focus:outline-none"
            onClick={() => setShowLinks(!showLinks)}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 6h16v1H4V6zm0 5h16v1H4v-1zm0 5h16v1H4v-1z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`sm:flex sm:items-center ${showLinks ? "" : "hidden"}`}>
        <ul className="flex flex-col sm:flex-row gap-5">
          {isLoggedIn && (
            <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link to="/menu">Menu</Link>
            </li>
          )}
          <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
            <Link to="food_courts">Food Courts</Link>
          </li>
          <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
            <Link to="/admin">Admin</Link>
          </li>
          {isLoggedIn && (
            <li className=" flex items-center gap-1 text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link to="/cart">Cart</Link>

              <div className="flex relative">
                <ShoppingCartIcon />
                <div className="flex absolute -top-3 -right-1 text-sm cursor-pointer">
                  <p className="text-orange-600">{cartLength}</p>
                </div>
              </div>
            </li>
          )}
          {isLoggedIn ? (
            <>
              <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link to="/login">Login/Register</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
