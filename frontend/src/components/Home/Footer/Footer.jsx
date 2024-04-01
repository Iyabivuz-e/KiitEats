import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 text-center absolute left-0 bottom-0 w-full z-9999">
      <div className="container mx-auto">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} KiitEats. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
