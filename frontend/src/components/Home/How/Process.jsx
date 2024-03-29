import React from "react";
import searchImage from "../../../assets/four.jpg";
import step1 from "../../../assets/five.jpg";
import pay from "../../../assets/pay1.jpg";
import delivery from "../../../assets/delivery.jpg";

const Process = () => {
  return (
    <div className="flex flex-col justify-center gap-1 mt-5 w-full">
      <h1 className="text-center text-orange-600 text-2xl sm:text-3xl font-semibold">
        How To KiitEat?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 items-center p-5">
        <div className="relative sm:max-w-[300px] sm:h-[180px]">
          <img
            src={step1}
            alt="search-img"
            className="w-full h-full object-cover"
          />
          <div className="px-2 w-full h-full absolute top-0 flex flex-col gap-2 justify-center items-center bg-[rgba(0,0,0,0.7)] text-[rgb(218,228,240)]">
            <h1 className="text-xl text-orange-600">Step 1</h1>
            <p className="text-center">Search for a food court</p>
          </div>
        </div>
        <div className="relative sm:max-w-[300px] sm:h-[180px]">
          <img
            src={searchImage}
            alt="search-img"
            className="w-full h-full object-cover"
          />
          <div className="px-2 w-full h-full absolute top-0 flex flex-col gap-2 justify-center items-center bg-[rgba(0,0,0,0.7)] text-[rgb(218,228,240)]">
            <h1 className="text-xl text-orange-600">Step 2</h1>
            <p className="text-center">Choose your favorite meal</p>
          </div>
        </div>
        <div className="relative sm:max-w-[300px] sm:h-[180px]">
          <img
            src={pay}
            alt="search-img"
            className="w-full h-full object-cover"
          />
          <div className="px-2 w-full h-full absolute top-0 flex flex-col gap-2 justify-center items-center bg-[rgba(0,0,0,0.7)] text-[rgb(218,228,240)]">
            <h1 className="text-xl text-orange-600">Step 3</h1>
            <p className="text-center">Pay online</p>
          </div>
        </div>
        <div className="relative sm:max-w-[300px] sm:h-[180px]">
          <img
            src={delivery}
            alt="search-img"
            className="w-full h-full object-cover"
          />
          <div className="px-2 w-full h-full absolute top-0 flex flex-col gap-2 justify-center items-center bg-[rgba(0,0,0,0.7)] text-[rgb(218,228,240)]">
            <h1 className="text-xl text-orange-600">Step 4</h1>
            <p className="text-center">Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
