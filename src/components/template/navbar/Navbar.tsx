import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchButton from "./SearchButton";
import Navlist from "./Navlist";
import { LogInIcon } from "lucide-react";
import ThemeSwitcher from "@/components/ui/ThemeSwither";
import { getServerAuthSession } from "@/server/auth";
import Profile from "./Profile";

const Navbar = async () => {
  const user = await getServerAuthSession();
  return (
    <nav className="container flex items-center justify-between py-3">
      <div className="flex w-full items-center gap-5">
        <Link href="/">
          <Image
            alt="Karcisku"
            src={"/logo.png"}
            width={40}
            height={40}
            priority
            className="rounded-md"
          />
        </Link>
        <SearchButton />
      </div>
      <div className="flex w-full items-center justify-end gap-5">
        <div className="hidden sm:flex">
          <Navlist />
        </div>
        {user ? (
          <Profile />
        ) : (
          <Button asChild>
            <Link href="/login" className="px-3">
              <LogInIcon className="mr-2" />
              Login
            </Link>
          </Button>
        )}
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
