import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {

  // ****************LOGIN VALIDATIONS****************
  const handleChange = () => {};
  const handleSubmit = () => {};
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 flex-col w-[450px] ">
      <input
        className="p-3 outline-none text-sm rounded-sm"
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Ennter your kiit mail id"
      />
      <small className="errors -mt-3 text-red-600">Error message</small>
      <input
        className="p-3 outline-none text-sm rounded-sm "
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Enter your password"
      />
      <small className="errors -mt-3 text-red-600">Error message</small>
      <Link className="text-sm text-blue-700 flex justify-end -mt-2">
        Forgot password?
      </Link>
      <button className="login-btn bg-blue-600 text-white p-1 text-lg rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;