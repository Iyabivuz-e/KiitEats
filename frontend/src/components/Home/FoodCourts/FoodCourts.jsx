import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { campuses } from "../../../FoodCourts";
// import { myContext } from "../../../context/AppContext"

const FoodCourts = () => {
  // const { products } = useContext(myContext);

  //** Handle load more and load less buttons*** */
  const initialPreview = 6;
  const [previewCampus, setPreviewCampus] = useState(initialPreview);
  const handleLoadMore = () => {
    const newPreview = Math.min(
      previewCampus + initialPreview,
      campuses.length
    );
    setPreviewCampus(newPreview);
  };
  const handleLoadLess = () => {
    setPreviewCampus(initialPreview);
  };

  return (
    <div className="flex flex-col justify-center gap-1 mt-5 w-full">
      <h1 className="text-center text-orange-600 text-3xl font-semibold">
        Select A Food Court
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-5 w-full mt-3 px-5 pb-3">
        {campuses.slice(0, previewCampus).map((campus) => (
          <Link
            to={`/menu/${campus.campusNumber}`}
            key={campus.id}
            className="py-3 px-4 bg-transparent border border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center"
          >
            <p className="text-lg font-semibold">{campus.campusNumber}</p>
            <p>{campus.name}</p>
            {/* <p>{products.length} foods available</p> */}
          </Link>
        ))}
      </div>
      {previewCampus < campuses.length ? (
        <button
          onClick={handleLoadMore}
          className="mb-3 py-2 px-3 bg-transparent border border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center w-[200px] m-auto"
        >
          Load More
        </button>
      ) : (
        <button
          onClick={handleLoadLess}
          className="mb-3 py-2 px-3 bg-transparent border border-blue-600 transition ease-in duration-150 rounded-md hover:border-0 hover:bg-orange-600 hover:text-white text-center w-[200px] m-auto"
        >
          Load Less
        </button>
      )}
    </div>
  );
};

export default FoodCourts;
