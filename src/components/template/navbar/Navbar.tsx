import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchButton from "./search/SearchButton";
import Navlist from "./Navlist";
import { ArrowRight } from "lucide-react";
import ThemeSwitcher from "@/components/ui/ThemeSwither";
import { getServerAuthSession } from "@/server/auth";
import Profile from "./Profile";
import SearchMobile from "./search/SearchMobile";
import Notify from "./notify/Notify";

const Navbar = async () => {
  const user = await getServerAuthSession();
  return (
    <nav className="container flex items-center justify-between gap-2 py-3">
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
      <div className="flex w-fit items-center justify-end gap-2 lg:w-full">
        <div className="hidden sm:flex">
          <Navlist />
        </div>
        {user ? (
          <>
            <SearchMobile />
            <Notify />
            <Profile data={user} />
          </>
        ) : (
          <>
            <ThemeSwitcher />
            <Button asChild>
              <Link href="/login" className="gap-2">
                Login
                <ArrowRight />
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
