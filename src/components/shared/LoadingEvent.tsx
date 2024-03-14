import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingEvent = () => {
  const loader = Array.from({ length: 15 }, (value, index) => index);
  return (
    <React.Fragment>
      {loader.map((_, index) => (
        <div className="flex h-[300px] flex-col gap-2" key={index}>
          <Skeleton className="h-[144px] w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-3 w-[40%]" />
          <Skeleton className="h-3 w-[10%]" />
        </div>
      ))}
    </React.Fragment>
  );
};

export default LoadingEvent;
