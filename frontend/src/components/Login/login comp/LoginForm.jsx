import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../../context/AppContext";

const LoginForm = () => {
  const { login } = useContext(myContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", // specify the content type
        },
        body: JSON.stringify(data), // convert data to JSON string
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        alert(responseData["message"]); // parse response data
      } else {
        alert(responseData["message"]);
        localStorage.setItem("userId", responseData.userId);
        localStorage.setItem("token", responseData.token);
        navigate("/"); // navigate
        login();
      }
    } catch (error) {
      console.log(error);
    }
    reset(); // reset the form
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 flex gap-3 flex-col w-full pb-3"
    >
      <input
        className="p-3 outline-none text-sm rounded-sm"
        type="email"
        name="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Please enter a valid email address",
          },
        })}
        placeholder="Enter your email"
      />

      {errors.email && (
        <small className="-mt-3 text-red-600 error-message-on">
          {errors.email.message}
        </small>
      )}

      <input
        className="p-3 outline-none text-sm rounded-sm"
        type="password"
        name="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        placeholder="Enter your password"
      />

      {errors.password && (
        <small className="-mt-3 text-red-600 error-message-on">
          {errors.password.message}
        </small>
      )}
      <Link className="text-sm text-blue-700 flex justify-end -mt-2">
        Forgot password?
      </Link>
      <button
        type="submit"
        className="login-btn bg-blue-600 text-white p-1 text-lg rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
