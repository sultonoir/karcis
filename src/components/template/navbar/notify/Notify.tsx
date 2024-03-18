"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotifiDot from "./NotifiDot";
import { Bell } from "lucide-react";
import NotifyItem from "./NotifyItem";
import { api } from "@/trpc/react";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";

const Notify = () => {
  const ctx = api.useUtils();
  const { mutate } = api.notify.openNotify.useMutation({
    onSuccess: async () => {
      await ctx.notify.getNotifyLength.invalidate();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const handleClick = useDebouncedCallback(() => {
    mutate();
  }, 300);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-11 rounded-full"
          size="icon"
          onClick={handleClick}
        >
          <NotifiDot />
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 pr-0">
        <h2 className="mb-4 font-medium leading-none">Notifications</h2>
        <NotifyItem />
      </PopoverContent>
    </Popover>
  );
};

export default Notify;
