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
import { signOut, useSession } from "next-auth/react";
import { FiUser } from "react-icons/fi";
import { TbTicket } from "react-icons/tb";
import { MdOutlineEventNote } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
const Profile = () => {
  const { data } = useSession();
  const lists = [
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={data?.user.image ?? ""} alt="@shadcn" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="inline-flex space-x-2">
          <Avatar>
            <AvatarImage src={data?.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>S</AvatarFallback>
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
              className="relative cursor-pointer"
            >
              <a
                href={item.path}
                className="flex h-full w-full items-center gap-2"
              >
                <item.icons size={22} />
                {item.title}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex cursor-pointer items-center gap-2 text-rose-500 focus:text-rose-600"
        >
          <BiLogOut size={22} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
