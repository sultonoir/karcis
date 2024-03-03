"use client";
import { Button } from "@/components/ui/button";
import usePayment from "@/hooks/usePayment";
import useTabs from "@/hooks/useTabs";
import { type Events } from "@/xata";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  event: Events;
  minPrice?: number | undefined;
}

const EventMobilePayment = ({ event, minPrice }: Props) => {
  const { data } = useSession();
  const { onChange } = useTabs();
  const { selected, addPayment } = usePayment();

  //get total ticket
  const totalTiket = selected.reduce(
    (total, current) => total + current.totalProduct,
    0,
  );

  //get total price
  const totalPrice = selected.reduce(
    (total, current) => total + current.totalPrice,
    0,
  );

  //check value exixts
  const exists = selected.some((item) => item.eventId === event.id);

  //hook router
  const router = useRouter();

  //handle click payment
  const handlePayment = () => {
    if (!data) {
      router.push("/login");
      return;
    }
    if (!exists) {
      onChange("ticket");
      toast.error("buy at least 1 ticket");
      return;
    }
    addPayment({
      eventId: event.id,
      eventImage: event.image?.url ?? "/logo.png",
      eventName: event.title ?? "event title",
      amount: totalTiket,
      price: totalPrice,
    });
    router.push("/payment");
  };

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
        <Button onClick={handlePayment}>Buynow</Button>
      </div>
    </div>
  );
};

export default EventMobilePayment;
