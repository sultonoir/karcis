import React from "react";
import { TbLoader3 } from "react-icons/tb";

const Loading = () => {
  return (
    <div className="fixed inset-0">
      <div className="flex size-full items-center justify-center gap-2 text-4xl">
        <TbLoader3 size={30} className="h-4 w-4 animate-spin" />
        loading
      </div>
    </div>
  );
};

export default Loading;
