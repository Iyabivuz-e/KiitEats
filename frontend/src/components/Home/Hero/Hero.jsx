import React from "react";
import three from "../../../assets/five.jpg";
import SearchIcon from "@mui/icons-material/Search";

const Hero = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-[350px] object-cover"
        src={three}
        alt="image slider"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.6)] px-6 md:px-20">
        <h1 className="mb-4 text-orange-600 text-2xl text-center max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <div className="w-full max-w-md px-2 py-1 flex items-center rounded-full bg-[rgb(203,213,225)]">
          <SearchIcon className="text-sm text-gray-600" />
          <input
            type="text"
            name="search"
            className="p-3 flex-grow outline-none bg-transparent text-sm"
            placeholder="Enter your campus name"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
