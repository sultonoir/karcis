"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { dummy } from "@/lib/data";
import Lamp from "@/components/ui/Lamp";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
import { Ticket, User2Icon } from "lucide-react";
const Sidebar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="flex h-full flex-col overflow-y-auto border-r bg-background shadow-sm">
      <Link href="/" className="inline-flex w-fit p-6">
        <Image
          width={40}
          height={40}
          src="/logo.png"
          priority
          loading="eager"
          alt="logo"
          className="rounded-md"
        />
      </Link>
      <div className="mb-auto flex w-full flex-col gap-1 px-4">
        <p className="font-medium text-muted-foreground">Dashboard</p>
        {dummy.sidebar.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 transition-transform duration-300 hover:translate-x-2",
              {
                "bg-primary text-white": item.path === pathname,
              },
            )}
          >
            <span className="inline-flex size-10 items-center justify-center rounded-md  p-1">
              <item.icons size={24} />
            </span>
            {item.title}
          </Link>
        ))}
        <Separator />
        <p className="pt-2 font-medium text-muted-foreground">Profile</p>
        <Link
          href="/member/profile"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1 transition-transform duration-300 hover:translate-x-2",
            {
              "bg-primary text-white": "/member/profile" === pathname,
            },
          )}
        >
          <span className="inline-flex size-10 items-center justify-center rounded-md  p-1">
            <User2Icon size={24} />
          </span>
          My profile
        </Link>
        <Separator />
        <p className="pt-2 font-medium text-muted-foreground">History</p>
        <Link
          href="/member/my-ticket"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1 transition-transform duration-300 hover:translate-x-2",
            {
              "bg-primary text-white": "/member/my-ticket" === pathname,
            },
          )}
        >
          <span className="inline-flex size-10 items-center justify-center rounded-md  p-1">
            <Ticket size={24} />
          </span>
          My ticket
        </Link>
      </div>
      <Separator />
      <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm p-4">
        <div className="flex size-10 items-center justify-center rounded-md bg-primary/20 p-1">
          <Lamp width={24} hanging={24} className="size-6 text-primary" />
        </div>
        <p className="flex-1 text-sm">Dark mode</p>
        <Switch
          className="z-30"
          checked={theme === "dark"}
          onCheckedChange={() => {
            if (theme === "dark") {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
