"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
interface Values {
  title: string;
  price: string;
  isFree: boolean;
  description?: string | undefined;
  count: string;
}

interface Props {
  value: Values;
  actions?: React.ReactNode;
}

const TicketCard = ({ value, actions }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{
          duration: 0.5, // mengatur durasi transisi
          ease: "easeInOut", // menetapkan jenis transisi
        }}
        className="relative grid min-h-[193px] rounded-sm border  border-primary bg-primary/20 px-5 py-3 before:absolute before:bottom-[53px] before:left-[-1px] before:h-[32px] before:w-[20px] before:rounded-r-[75px] before:border before:border-l-0 before:border-solid before:border-primary before:bg-background after:absolute after:bottom-[53px] after:right-[-1px] after:h-[32px] after:w-[20px] after:rounded-l-[75px] after:border after:border-r-0 after:border-solid after:border-primary after:bg-background sm:px-8 sm:py-4"
        key={value.title}
      >
        <div
          className={cn(
            "relative grid h-fit pb-10 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:border-b after:border-dashed after:border-primary",
            {
              "pb-16": value.description === "",
            },
          )}
        >
          <h3 className="text-2xl">{value.title}</h3>
          <p className="mt-2 h-full">{value.description}</p>
        </div>
        <div className="flex size-full items-center justify-between pt-4">
          {value.isFree || value.price === "0" ? (
            <h3 className="text-4xl font-bold">Free</h3>
          ) : (
            <h3 className="text-4xl font-bold">${value.price}</h3>
          )}
          {actions}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TicketCard;
