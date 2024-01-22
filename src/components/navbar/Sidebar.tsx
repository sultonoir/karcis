"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { BiLayout } from "react-icons/bi";
import { TbTicket } from "react-icons/tb";
import { MdOutlineEventNote } from "react-icons/md";
const Sidebar = () => {
  const navbarList = [
    {
      icons: BiLayout,
      label: "Dashboard",
      path: "/profile",
    },
    {
      icons: MdOutlineEventNote,
      label: "My event",
      path: "/profile/event",
    },
    {
      icons: TbTicket,
      label: "My ticket",
      path: "/profile/ticket",
    },
  ];
  const pathname = usePathname();
  return (
    <aside className="h-full flex-col overflow-y-auto border-r bg-background shadow-sm">
      <a href="/" className="inline-flex w-fit p-6">
        <Image width={40} height={40} src="/logo.png" alt="logo" />
      </a>
      <div className="flex w-full flex-col space-y-1">
        {navbarList.map((item) => {
          const isActive = item.path === pathname;
          return (
            <a
              key={item.label}
              href={item.path}
              type="button"
              className={cn(
                "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
                isActive &&
                  "bg-blue-200/20 text-blue-700 hover:bg-blue-200/20 hover:text-blue-700",
              )}
            >
              <div className="flex items-center gap-x-2 py-4">
                <item.icons
                  size={22}
                  className={cn("text-slate-500", isActive && "text-blue-700")}
                />
                {item.label}
              </div>
              <div
                className={cn(
                  "ml-auto h-[54px] border-2 border-blue-700 opacity-0 transition-all",
                  isActive && "opacity-100",
                )}
              />
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
