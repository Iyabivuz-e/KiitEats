import React from "react";

function Home({ isLogged }) {
  return (
    <div className="flex justify-center items-center h-screen">
      {!isLogged && (
        // <h1 className="text-4xl font-bold text-center">
        //     Welcome to kiitEats Admin panel
        // </h1>
        <h1 className="text-4xl text-blue-600 font-semibold text-center">
          Welcome to Kiit
          <span className="text-center font-bold text-[rgb(234 88 12)] mr-2">
            Eats
          </span>
          Admin panel
        </h1>
      )}
    </div>
  );
}

export default Home;
