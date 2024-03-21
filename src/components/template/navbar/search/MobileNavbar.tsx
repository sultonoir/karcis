"use client";
import { dummy } from "@/lib/data";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavbar = () => {
  const path = usePathname();
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 block border-t bg-background backdrop-blur-sm lg:hidden",
        {
          hidden: path === "event" || path.startsWith("event"),
        },
      )}
    >
      <ul className="flex items-center justify-between px-5 py-2">
        <li>
          <Link href="/" className="flex flex-col items-center">
            <HomeIcon />
            Home
          </Link>
        </li>
        {dummy.navbar.map((item) => (
          <li key={item.title}>
            <Link href={item.path} className="flex flex-col items-center">
              <item.icon />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNavbar;
