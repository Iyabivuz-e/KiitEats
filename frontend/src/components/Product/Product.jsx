import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import campusImage from "../../assets/two.jpg";
import { myContext } from "../../context/AppContext";

const Product = () => {
  const { campusAddress } = useParams();
  const { products, fetchProducts } = useContext(myContext);

  useEffect(() => {
    fetchProducts(campusAddress);
  }, [campusAddress, fetchProducts]);

    if (!products) {
      return <div>Loading...</div>;
    }

  return (
    <div className="w-full h-[350px] relative">
      <img
        className="w-full h-full object-cover"
        src={campusImage}
        alt="image slider"
      />
      <div className="w-full h-full absolute top-0 flex flex-col justify-center items-center bg-[rgb(0,0,0,0.7)] px-20">
        <h1 className="mb-4 text-orange-600 text-5xl text-center w-full">
          Foods available at {campusAddress}
        </h1>
      </div>
      {products.length === 0 ? (
        <h1 className="text-center mt-7 text-2xl ">
          No Food is found at {campusAddress}
        </h1>
      ) : (
        <ul className="mt-5 px-5 grid grid-cols-3 gap-4 pb-3">
          {products.map((product) => (
            <Link to={`/menu/foods/${product.id}`} className="rounded-lg shadow " key={product.id}>
              <div className="h-[230px]">
                <img
                  src={campusImage}
                  alt="product image"
                  className="rounded-lg h-full w-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex justify-between mb-2">
                  <p className="text-lg">{product.prodName}</p>
                  <p className="text-lg text-orange-600">
                    &#x20B9;{product.prodPrice}
                  </p>
                </div>
                <p className="text-sm">{product.prodDescription}</p>
                <p className="text-sm">Location: {product.prodAddress}</p>
              </div>
              <div className="p-3 flex justify-between gap-2">
                <Link
                  to=""
                  className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
                >
                  Buy Now
                </Link>
                <button className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center ">
                  Add To Cart
                </button>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Product;