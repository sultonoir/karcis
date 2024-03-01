"use client";
import { Button } from "@/components/ui/button";
import usePayment from "@/hooks/usePayment";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface Data {
  id: string;
  title: string;
  price: string;
  count: string;
  isFree: boolean;
  description?: string | undefined;
}

interface Props {
  max: number;
  ticket: Data;
  eventId: string;
}

const TicketQuantity = ({ max, ticket, eventId }: Props) => {
  const { increment, decrement, selected } = usePayment();
  const [totalTiket] = selected.filter((item) => item.ticketId === ticket.id);
  const MaxTotal = selected.reduce(
    (total, current) => total + current.totalProduct,
    0,
  );

  return (
    <div className="flex gap-2">
      <Button
        size="icon"
        variant="bordered"
        className="rounded-full"
        onClick={() => {
          decrement({
            ticketId: ticket.id,
            totalPrice: parseInt(ticket.price),
            totalProduct: 1,
            name: ticket.title,
            eventId,
          });
        }}
      >
        <MinusIcon />
      </Button>
      <span className="text-2xl">{totalTiket?.totalProduct ?? 0}</span>
      <Button
        size="icon"
        variant="bordered"
        className="rounded-full"
        onClick={() => {
          const productExists = selected.some(
            (item) => item.eventId === eventId,
          );
          if (MaxTotal === max && productExists) {
            return toast.error(`Max tiket is ${max}`);
          }
          increment({
            ticketId: ticket.id,
            totalPrice: parseInt(ticket.price),
            totalProduct: 1,
            name: ticket.title,
            eventId,
          });
        }}
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default TicketQuantity;
