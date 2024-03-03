"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";

const Loader = () => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-background">
      <div className="flex size-full flex-col items-center justify-center">
        <h3 className="w-[60%] text-end text-4xl font-bold">{value}%</h3>
        <Progress value={value} className="w-[60%]" />
      </div>
    </div>
  );
};

export default Loader;
