"use client";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import React from "react";

const NotifiDot = () => {
  const { data, isLoading } = api.notify.getNotifyLength.useQuery();
  return (
    <>
      {isLoading ? (
        <span
          className={cn(
            "absolute right-[1px] top-[1px] flex size-5 items-center justify-center rounded-full bg-primary p-1 text-white",
          )}
        >
          <Loader2 className="animate-spin" />
        </span>
      ) : (
        <>
          {data !== 0 && (
            <span
              className={cn(
                "absolute right-[1px] top-[1px] flex size-5 items-center justify-center rounded-full bg-primary p-1 text-white",
              )}
            >
              {data}
            </span>
          )}
        </>
      )}
    </>
  );
};

export default NotifiDot;
