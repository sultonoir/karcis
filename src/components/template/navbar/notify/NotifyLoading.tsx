import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const NotifyLoading = () => {
  const loader = Array.from({ length: 15 }, (value, index) => index);
  return (
    <ScrollArea className="h-72">
      {loader.map((item) => (
        <div className="my-2 flex items-center space-x-4" key={item}>
          <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default NotifyLoading;
