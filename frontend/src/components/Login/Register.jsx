import React, {useRef} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = ({ registerSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // Confirm password validations.
  const password = useRef({});
  password.current = watch("password", "");

  const onsSubmit = async(data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        data
      );

       if (response.status === 200) {
         alert(
           "User registered successfully. Please check your email for verification"
         );
      //  } else if (response.status === 401) {
      //    alert("Incorrect email or password");
      //  } else if (response.status === 404) {
      //    alert("User not found");
       } else {
         alert("An error occurred. Please try again later.");
       }
      } catch (error) {
      console.log(error);
    }
    reset();
    registerSuccess();
  };
  return (
    <form
      onSubmit={handleSubmit(onsSubmit)}
      className="flex gap-3 flex-col w-[450px] "
    >
      <input
        className="p-3 outline-none text-sm rounded-sm"
        type="text"
        name="username"
        {...register("username", {
          required: "Username is required",
          pattern: {
            value: /^[a-zA-Z0-9_.-]+$/,
            message: "Please enter a valid username",
          },
        })}
        placeholder="Enter your username"
      />
      {errors.username && (
        <small className="-mt-3 text-red-600 error-message-on">
          {errors.username.message}
        </small>
      )}
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
        placeholder="Ennter your kiit mail id"
      />
      {errors.email && (
        <small className="-mt-3 text-red-600 error-message-on">
          {errors.email.message}
        </small>
      )}
      <input
        className="p-3 outline-none text-sm rounded-sm "
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
      <input
        className="p-3 outline-none text-sm rounded-sm "
        type="password"
        name="repeat_password"
        {...register("repeat_password", {
          required: "Repeat password is required",
          validate: (value) =>
            value === password.current || "The password do not match",
        })}
        placeholder="Repeat your password"
      />
      {errors.repeat_password && (
        <small className="-mt-3 text-red-600 error-message-on">
          {errors.repeat_password.message}
        </small>
      )}
      <button className="login-btn bg-blue-600 text-white p-1 text-lg rounded mt-2">
        Sign Up
      </button>
    </form>
  );
};

export default Register;
