import React from "react";
import { Skeleton } from "../ui/skeleton";
import LoadingEvent from "./LoadingEvent";

const LoadingUser = () => {
  return (
    <React.Fragment>
      <div className="relative">
        <Skeleton className="h-[100px] lg:h-[250px]" />
        <div className="flex h-fit flex-col items-center gap-5 overflow-hidden bg-background p-1 lg:flex-row lg:gap-10">
          <div className="z-10 size-28 flex-shrink-0 rounded-full bg-background p-1 lg:ml-10 lg:size-40">
            <Skeleton className="size-full rounded-full" />
          </div>
          <div className="flex w-full flex-col items-center gap-2 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="relative h-[20px] w-[200px] lg:w-[500px]" />
              <Skeleton className="relative h-[20px] w-[200px]" />
              <div className="flex flex-row gap-2">
                <Skeleton className="size-16 rounded-full" />
                <Skeleton className="size-16 rounded-full" />
                <Skeleton className="size-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid flex-1 grid-cols-1 gap-4 lg:grid-cols-5">
          <LoadingEvent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoadingUser;
