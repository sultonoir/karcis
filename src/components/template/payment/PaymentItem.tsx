"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import usePayment from "@/hooks/usePayment";
import Image from "next/image";

const PaymentItem = () => {
  const { eventName, eventImage, selected } = usePayment();

  return (
    <Card className="h-fit">
      <CardHeader className="flex-row items-center gap-5">
        <div className="relative h-[50px] w-[100px] ">
          <Image
            alt={eventName ?? "/logo.png"}
            src={eventImage}
            fill
            priority
            loading="eager"
            className="aspect-video object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold">{eventName}</h3>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default PaymentItem;
