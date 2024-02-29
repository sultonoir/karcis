import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <Navbar />
    </header>
  );
};

export default Header;
