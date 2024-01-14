"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/ThemeToggle";
const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="sticky top-0 border-b bg-background/50 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-2 p-2">
        <a href="/" className="flex items-center gap-2">
          <p className="text-lg font-semibold">Sultonoir</p>
        </a>
        <div className="flex flex-row items-center gap-2">
          <ThemeToggle />
          {!data ? <Button size="sm">Login</Button> : <Button>Logout</Button>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
