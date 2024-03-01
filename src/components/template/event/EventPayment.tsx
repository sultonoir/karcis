"use client";
import { Button } from "@/components/ui/button";
import usePayment from "@/hooks/usePayment";
import Image from "next/image";
import React from "react";

interface Props {
  minPrice?: number | undefined;
  eventId: string;
}

const EventPayment = ({ minPrice, eventId }: Props) => {
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
    <div className="sticky top-[75px] h-fit w-full rounded-lg border p-4 shadow-sm">
      {selected.length && exists ? (
        <div className="grid w-full gap-5 divide-y-2">
          {selected.map((item) => (
            <div
              className="flex w-full gap-5 py-5 first:py-0"
              key={item.ticketId}
            >
              <Image src="/tiket.svg" width={40} height={40} alt="tiket" />
              <div className="flex w-full flex-col">
                <h3>{item.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {item.totalProduct} Ticket
                  </p>
                  <p className="text-lg font-bold">${item.totalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-5 pb-5">
          <Image src="/tiket.svg" width={40} height={40} alt="tiket" />
          <p>
            You have not selected a ticket yet. Please select it first in the
            TICKETS menu tab.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 border-t pt-5">
        <div className="flex items-center justify-between">
          {selected.length && exists ? (
            <>
              <p className="text-muted-foreground">{totalTiket} Ticket</p>
              <p className="text-lg font-bold">${totalPrice}</p>
            </>
          ) : (
            <>
              <p>Prices start from</p>
              <p className="text-lg font-bold">${minPrice}</p>
            </>
          )}
        </div>
        <Button>Buy ticket</Button>
      </div>
    </div>
  );
};

export default EventPayment;
