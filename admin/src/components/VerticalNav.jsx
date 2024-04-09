import React from 'react'
import { Link } from "react-router-dom";

const VerticalNav = () => {
  return (
    <div className="bg-gray-900 h-screen w-64 py-8 px-4">
      <div className="text-white text-lg font-semibold mb-4">Menu</div>
      <ul>
        <li className="mb-2">
          <Link to="/products" className="text-gray-300 hover:text-white block">
            Products
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/" className="text-gray-300 hover:text-white block">
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/orders" className="text-gray-300 hover:text-white block">
            Orders
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/" className="text-gray-300 hover:text-white block">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default VerticalNav
