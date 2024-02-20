import React from "react";
import ThemeToggle from "../ui/ThemeToggle";
import Image from "next/image";
import { getServerSession } from "next-auth";
import Profile from "../ui/Profile";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = async () => {
  const data = await getServerSession();
  return (
    <header className="sticky top-0 border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-2 p-2">
        <a href="/" className="flex items-center gap-2" title="Karcisku">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </a>
        <div className="flex flex-row items-center gap-2">
          <Link href="/eventserver">Server components</Link>
          <Link href="/eventclient">Client components</Link>
          <ThemeToggle />
          {!data ? (
            <Button size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <Profile />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
