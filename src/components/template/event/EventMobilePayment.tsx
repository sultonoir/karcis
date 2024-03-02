"use client";
import { Button } from "@/components/ui/button";
import usePayment from "@/hooks/usePayment";
import useTabs from "@/hooks/useTabs";
import React from "react";

interface Props {
  eventId: string;
  minPrice?: number | undefined;
}

const EventMobilePayment = ({ eventId, minPrice }: Props) => {
  const { onChange } = useTabs();
  const { selected } = usePayment();
  const totalTiket = selected.reduce(
    (total, current) => total + current.totalProduct,
    0,
  );
  const totalPrice = selected.reduce(
    (total, current) => total + current.totalPrice,
    0,
  );

  const exists = selected.some((item) => item.eventId === eventId);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block bg-background backdrop-blur-sm lg:hidden">
      <div className="container flex items-center justify-between py-3">
        {selected.length && exists ? (
          <div className="flex flex-col">
            <p className="text-muted-foreground">{totalTiket} Ticket</p>
            <p className="text-lg font-bold">${totalPrice}</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <p>Prices start from</p>
            <p className="text-lg font-bold">${minPrice}</p>
          </div>
        )}
        <Button onClick={() => onChange("ticket")}>Buynow</Button>
      </div>
    </div>
  );
};

export default EventMobilePayment;
