import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#2C2F48] py-4 text-white sticky top-[-1px] customContainer z-50">
      <Link to="/">Go to home page</Link>
    </header>
  );
};

export default Header;
