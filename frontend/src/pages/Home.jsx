// Home.js
// import React from "react";
import Hero from "../components/Home/Hero/Hero";
import Process from "../components/Home/How/Process";
import FoodCourts from "../components/Home/FoodCourts/FoodCourts";
import { myContext } from "../context/AppContext";
import { useContext } from "react";
// import Product from "../components/Product/Product";
import SearchFood from "../components/searchFood/SearchFood";

const Home = () => {
  const { handleSearchSubmit} = useContext(myContext);
  return (
    <div>
      <Hero />
      {handleSearchSubmit && <SearchFood /> }
      <Process />
      <FoodCourts />
    </div>
  );
};

export default Home;
