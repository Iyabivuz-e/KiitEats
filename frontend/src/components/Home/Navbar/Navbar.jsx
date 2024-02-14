import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
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
          <li className='text-blue-700 hover:text-orange-600 transition-all duration-400 text-base'>
            <Link to="/">Home</Link>
          </li>
          <li className='text-blue-700 hover:text-orange-600 transition-all duration-400 text-base'>
            <Link>Menu</Link>
          </li>
          <li className='text-blue-700 hover:text-orange-600 transition-all duration-400 text-base'>
            <Link>Food</Link>
          </li>
          <li className='text-blue-700 hover:text-orange-600 transition-all duration-400 text-base'>
            <Link>Food Court</Link>
          </li>
          <li className='text-blue-700 hover:text-orange-600 transition-all duration-400 text-base'>
            <Link to="/login">Login/Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar
