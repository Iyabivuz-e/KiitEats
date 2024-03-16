import React from 'react'

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2 bg-white bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-orange-500"></div>
      <h1 className="text-blue-600 font-semibold text-3xl">
        Kiit
        <span className="text-3xl font-bold text-orange-600">Eats</span>
      </h1>
    </div>
  );

}

export default Loader
