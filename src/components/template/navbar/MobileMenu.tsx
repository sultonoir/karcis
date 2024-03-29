"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { dummy } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Menu, Ticket, User2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import EventDetailsButton from "./EventDetailsButton";
import { Separator } from "@/components/ui/separator";
import Lamp from "@/components/ui/Lamp";
import { Switch } from "@/components/ui/switch";

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const params = useParams<{ id: string }>();
  const onOpenChange = () => setOpen(!open);

  return (
    <Sheet defaultOpen={open} open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="mb-auto flex w-full flex-col gap-1">
          <p className="font-medium text-muted-foreground">Dashboard</p>
          {dummy.sidebar.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              onClick={onOpenChange}
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
          {params.id && <EventDetailsButton />}
          <p className="pt-2 font-medium text-muted-foreground">Profile</p>
          <Link
            href="/member/profile"
            onClick={onOpenChange}
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
            onClick={onOpenChange}
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
