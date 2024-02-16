// Home.js
import React from "react";
import Navbar from "../components/Home/Navbar/Navbar";
import Hero from "../components/Home/Hero/Hero";
import Process from "../components/Home/How/Process";
import FoodCourts from "../components/Home/FoodCourts/FoodCourts";

const Home = () => {
  return (
    <div>
      <Hero/>
      <Process/>
      <FoodCourts/>
    </div>
  );
};

export default Home;
