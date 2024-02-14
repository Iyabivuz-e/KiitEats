import "./css/Login.css";
import LoginForm from "./login comp/LoginForm";
import Register from "./Register";
import { useState } from "react";

const Login = () => {
  // ****************HANDLING SWITCHING BETWEEN LOGIN AND REGISTER****************
  const [showLogins, setShowLogins] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLoginClick = () => {
    setShowLogins(true);
  };
  const handleRegisterClick = () => {
    setShowLogins(false);
  };

  const registerSuccess = () => {
    setIsRegistered(true);
    setShowLogins(true);
  };

  return (
    <div className="flex flex-col mt-4 items-center -z-10">
      <h1 className="text-blue-600 font-semibold text-4xl">
        Welcome to Kiit<span className="text-orange-600">Eats</span>
      </h1>

      <div className="max-w-xl mt-8">
        <div className=" flex justify-around py-3">
          <button
            onClick={handleLoginClick}
            className={`font-medium bg-transparent text-black py-2 px-12 rounded-md border-2 border-blue-600 ${
              showLogins ? "active" : ""
            }`}
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            className={`font-medium bg-transparent text-black py-2 px-12 rounded-md border-2 border-blue-600 ${
              !showLogins ? "active" : ""
            }`}
          >
            Register
          </button>
        </div>
        <div className="mt-4">
          {showLogins ? (
            <LoginForm />
          ) : (
            <Register registerSuccess={registerSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
