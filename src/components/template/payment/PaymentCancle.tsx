"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentCancle = () => {
  const router = useRouter();
  return (
    <div className="flex h-fit w-full items-center gap-2">
      <Button size="icon" variant="ghost" onClick={() => router.back()}>
        <ChevronLeft />
      </Button>
      <h3 className="text-2xl font-semibold">Confirm and pay</h3>
    </div>
  );
};

export default PaymentCancle;
