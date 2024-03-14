import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center py-4 bg-gray-800 text-gray-300">
      <p>
        Copyright &copy; {new Date().getFullYear()} KiitEats. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
