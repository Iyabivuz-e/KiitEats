import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { campuses } from "../../../FoodCourts";
import Loader from "../../../utilities/Loader";

const FCourts = ({ loading, setLoading }) => {
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-center gap-1 mt-5 w-full">
      <h1 className="text-center text-orange-600 text-3xl font-semibold">
        Kiit Food Courts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-5 w-full mt-3 px-5 pb-3">
        {campuses.map((campus) => (
          <Link
            to={`/menu/${campus.campusNumber}`}
            key={campus._id}
            className="py-3 px-4 bg-transparent border border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center"
          >
            <p className="text-lg font-semibold">{campus.campusNumber}</p>
            <p>{campus.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FCourts;
