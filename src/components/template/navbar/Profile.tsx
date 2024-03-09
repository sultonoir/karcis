"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { FiUser } from "react-icons/fi";
import { TbTicket } from "react-icons/tb";
import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Lamp from "@/components/ui/Lamp";
import { Switch } from "@/components/ui/switch";
import { type Session } from "next-auth";

interface Props {
  data: Session | null;
}

const Profile = ({ data }: Props) => {
  const lists = [
    {
      title: "Client",
      icons: MdDashboard,
      path: `/client`,
    },
    {
      title: "Profile",
      icons: FiUser,
      path: `/profile`,
    },
    {
      title: "My event",
      icons: MdOutlineEventNote,
      path: `/profile/event`,
    },
    {
      title: "My ticket",
      icons: TbTicket,
      path: `/profile/ticket`,
    },
  ];

  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={data?.user.image ?? ""} alt="@shadcn" />
          <AvatarFallback>
            {data?.user.email?.slice(0, 1).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="inline-flex space-x-2">
          <Avatar>
            <AvatarImage src={data?.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>
              {data?.user.email?.slice(0, 1).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="inline-flex flex-col items-start">
            <span className="text-small text-inherit">
              <p className="font-semibold capitalize">{data?.user.name}</p>
            </span>
            <span className="text-tiny text-muted-foreground">
              <p className="max-w-[150px] truncate">{data?.user.email}</p>
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {lists.map((item) => (
            <DropdownMenuItem
              key={item.title}
              title={item.title}
              className="relative h-fit cursor-pointer"
            >
              <a
                href={item.path}
                className="flex h-full w-full items-center gap-2"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 p-1">
                  <item.icons size={24} className="text-primary" />
                </span>
                {item.title}
              </a>
            </DropdownMenuItem>
          ))}
          <div className="relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/20 p-1">
              <Lamp width={24} hanging={24} className="size-6 text-primary" />
            </div>
            <p>Dark mode</p>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className="w-full cursor-pointer gap-2 border border-primary bg-primary text-white hover:bg-primary focus:bg-primary focus:text-white focus:hover:opacity-80"
            onClick={() => signOut()}
          >
            <BiLogOut size={22} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
