import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"

const LoginForm = () => {
  // ****************LOGIN VALIDATIONS****************

  const navigate = useNavigate();

  const goToHome = () => {
    // setIsLoggedIn(false);
    navigate('/')
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
    goToHome()
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-3 flex-col w-[450px] "
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
        placeholder="Enter your kiit mail id"
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

      {/* ****ERROR MESSAGES FOR PASSWORD*** */}
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
