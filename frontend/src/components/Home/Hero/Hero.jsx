import React, { useContext, useState } from "react";
import three from "../../../assets/five.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { myContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  // const navigate = useNavigate();
  const { searchInput, setSearchInput, handleSearchSubmit } =
    useContext(myContext);

  return (
    <div className="relative">
      <img
        className="w-full h-[350px] object-cover"
        src={three}
        alt="image slider"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.7)] px-6 md:px-20">
        <h1 className="mb-4 text-orange-500 text-3xl text-center max-w-lg font-semibold">
          "Your Campus, Your Comfort. Student Food Delivery Made Simple"
        </h1>
        <div className="w-full max-w-md px-2 py-1 flex items-center rounded-full bg-[rgb(203,213,225)] cursor-pointer">
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setSearchInput();
            }}
            className="p-2 flex-grow outline-none bg-transparent text-sm autofill:optional:*:first-letter:"
            placeholder="Enter your campus name, ex: campus 5"
          />
          <button
            onClick={handleSearchSubmit}
            className="text-gray-600 bg-orange-600 rounded-full p-2 flex items-center justify-center"
          >
            <SearchIcon className="text-2xl text-[rgb(203,213,225)] cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
