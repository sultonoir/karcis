"use client";
import RippleButton from "@/components/ui/RippleButton";
import React from "react";

const page = () => {
  return (
    <div className="mt-2">
      <RippleButton
        variant="outline"
        size="default"
        onClick={() => {
          console.log("hallo world");
        }}
      >
        hallo
      </RippleButton>
    </div>
  );
};

export default page;
