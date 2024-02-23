import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../../../context/AppContext';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {

    const { isLoggedIn, logout } = useContext(myContext);
    const handleLogout = () => {
      logout();
    }

  return (
    <div className="navabar-container">
      <div className="logo">
        <Link to="/">
          <h1 className="text-blue-600 font-semibold text-3xl">
            Kiit<span className="text-3xl font-bold text-orange-600">Eats</span>
          </h1>
        </Link>
      </div>

      <div className="navigations">
        <ul className="flex gap-5">
          <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link>Menu</Link>
            </li>
          )}
          <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
            <Link>Food Courts</Link>
          </li>
          <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
            <Link to="/admin">Admin</Link>
          </li>
          {isLoggedIn && (
            <li className=" flex justify-center items-center gap-1 text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link>Cart</Link>

              <div className="flex relative">
                <ShoppingCartIcon />
                <div className="flex absolute -top-3 -right-1 text-sm cursor-pointer">
                  <p className='text-orange-600'>0</p>
                </div>
              </div>
            </li>
          )}
          {isLoggedIn ? (
            <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          ) : (
            <li className="text-blue-700 hover:text-orange-600 transition-all duration-400 text-base">
              <Link to="/login">Login/Register</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar
