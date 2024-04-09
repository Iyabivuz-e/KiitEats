import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import campusImage from "../../assets/two.jpg";
import { myContext } from "../../context/AppContext";
import Loader from "../../utilities/Loader";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const { makePayment, isLoggedIn } = useContext(myContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setMenus(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-[350px] relative">
      <img
        className="w-full h-full object-cover"
        src={campusImage}
        alt="image slider"
      />
      <div className="w-full h-full absolute top-0 flex flex-col justify-center items-center bg-[rgb(0,0,0,0.7)] px-20">
        <h1 className="mb-4 text-orange-600 sm:text-5xl text-center w-full text-4xl">
          KiiT Food Courts Menu
        </h1>
      </div>
      <ul className="mt-10 px-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 pb-3">
        {menus.map((product) => (
          <Link
            to={`/foods/${product._id}`}
            className="rounded-lg shadow "
            key={product._id}
          >
            <div className="h-[230px]">
              <img
                src={product.prodImage}
                alt="product image"
                className="rounded-lg h-full w-full object-cover"
              />
            </div>
            <div className="p-3 flex flex-col gap-2">
              <div className="flex justify-between mb-2">
                <p className="text-lg">{product.prodName}</p>
                <p className="text-lg text-orange-600">
                  {/* &#x20B9;{product.prodPrice} */}
                </p>
              </div>
              <p className="text-sm">&#8377;{product.prodPrice}</p>
              <p className="text-sm">Location: {product.prodAddress}</p>
            </div>
            <div className="p-3 flex justify-between gap-2">
              <div className="flex justify-between gap-2">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
                    >
                      Buy Now for &#8377;{product.totalPrice}
                    </Link>
                  </>
                ) : (
                  <>
                    <StripeCheckout
                      redirectToCheckout
                      name="KiitEats"
                      description={` ${product.prodName} : Total Price: Rs.${product.totalPrice}`}
                      stripeKey="pk_test_51OrxZNSD2wp2tswRa9uRElxaLNi9Z6og8VS2wmxHKKI6nI815NnXABIK6CrbhPfHx3lIwqX2J0nvqNaOa9nvst3B003j2uiwZd"
                      token={makePayment}
                      amount= {product.totalPrice * 100}
                      shippingAddress
                      billingAddress
                    >
                      <button
                        to=""
                        className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
                      >
                        Buy Now for &#8377; {product.totalPrice}
                      </button>
                    </StripeCheckout>
                  </>
                )}
              </div>
              <Link
                to={`/foods/${product._id}`}
                className="py-1 px-3 bg-transparent border-2 border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center "
              >
                View More
              </Link>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
