import React from "react";
import three from "../../../assets/five.jpg";
import SearchIcon from "@mui/icons-material/Search";

const Hero = () => {
  return (
    <div className="w-full h-[350px] relative">
      <img
        className="w-full h-full object-cover"
        src={three}
        alt="image slider"
      />
      <div className="w-full h-full absolute top-0 flex flex-col justify-center items-center bg-[rgb(0,0,0,0.6)] px-20">
        <h1 className="mb-4 text-orange-600 text-2xl text-center w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <div className="w-[500px] px-[10px] py-0 flex items-center rounded-3xl bg-[rgb(203,213,225)]">
          <SearchIcon className="text-sm text-gray-600" />
          <input
            type="text"
            name="search"
            className="p-3 w-[95%] outline-none bg-transparent text-sm"
            placeholder="Enter your campus name"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
