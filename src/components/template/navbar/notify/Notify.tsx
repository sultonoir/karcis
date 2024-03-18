import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { api } from "@/trpc/server";
import { type Notify } from "@/xata";
import Image from "next/image";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import fromNow from "dayjs/plugin/relativeTime";

dayjs.extend(fromNow);

const Notify = async () => {
  const data = await api.notify.getAllNotify.query();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-11 rounded-full"
          size="icon"
        >
          <span className="absolute right-[1px] top-[1px] flex size-5 items-center justify-center rounded-full bg-primary p-1 text-white">
            {data.length}
          </span>
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h2 className="mb-4 font-medium leading-none">Notifications</h2>
        <div className="scrollbar-hide flex h-fit max-h-[300px] flex-col gap-1 divide-y overflow-y-auto">
          {data.map((item) => (
            <div key={item.id} className={cn("flex gap-2 p-2")}>
              <div className="relative size-14 flex-shrink-0">
                <Image
                  alt={item.event?.title ?? "image"}
                  src={item.event?.image?.url ?? ""}
                  fill
                  placeholder="blur"
                  blurDataURL={item.event?.blur}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="leading-tight">{item.message}</h3>
                <p className="text-sm text-muted-foreground">
                  {`${dayjs(item.xata.createdAt).fromNow()}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notify;
