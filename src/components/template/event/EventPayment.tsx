"use client";
import { Button } from "@/components/ui/button";
import usePayment from "@/hooks/usePayment";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useTabs from "@/hooks/useTabs";
interface Props {
  minPrice?: number | undefined;
  eventId: string;
}

const EventPayment = ({ minPrice, eventId }: Props) => {
  const { data } = useSession();
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

  const payment = api.payment.createPayment.useMutation({
    onSuccess: () => {
      toast.success("Payment created");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const router = useRouter();
  const { onChange } = useTabs();
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
    payment.mutate({
      event: eventId,
      user: data?.user.id ?? "",
      totalPrice,
      amount: totalTiket,
      tiket: selected,
    });
  };

  return (
    <div className="sticky top-[75px] h-fit w-full rounded-lg border p-4 shadow-sm">
      {exists ? (
        <div className="grid w-full gap-5 divide-y-2">
          <AnimatePresence>
            {selected.map((item) => (
              <motion.div
                className="flex w-full gap-5 py-5 first:py-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{
                  duration: 0.5, // mengatur durasi transisi
                  ease: "easeInOut", // menetapkan jenis transisi
                }}
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
              </motion.div>
            ))}
          </AnimatePresence>
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
        <Button disabled={payment.isLoading} onClick={handlePayment}>
          Buy ticket
        </Button>
      </div>
    </div>
  );
};

export default EventPayment;
