import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Edit, PlusCircleIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Data {
  title: string;
  price: string;
  count: string;
  isFree: boolean;
  description?: string | undefined;
}

interface Props {
  values: Data[];
  handleChange: (values: Data[]) => void;
  mode: "create" | "edit"; // Tambah prop mode
  editValues?: Data;
}

const FieldTicket = ({ values, handleChange, mode, editValues }: Props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Data>({
    title: "",
    price: "0",
    count: "",
    isFree: false,
    description: "",
  });

  useEffect(() => {
    if (mode === "edit" && editValues) {
      setData(editValues);
    } else {
      setData({
        title: "",
        price: "0",
        count: "",
        isFree: false,
        description: "",
      });
    }
  }, [mode, editValues]);

  const handleClick = () => {
    let newData: Data = { ...data, price: data.isFree ? "0" : data.price };

    // Jika dalam mode edit, cari index data yang akan diubah
    let editedIndex = -1;
    if (mode === "edit" && editValues) {
      editedIndex = values.findIndex((item) => item.title === editValues.title);
    }

    // Jika title sudah ada di values dan bukan dalam mode edit
    if (
      values.some((item) => item.title === newData.title) &&
      mode !== "edit"
    ) {
      let incrementedTitle = newData.title;
      let count = 1;
      // Tambahkan increment -1 hingga title unik
      while (values.some((item) => item.title === incrementedTitle)) {
        incrementedTitle = `${newData.title}-${count}`;
        count++;
      }
      newData = { ...newData, title: incrementedTitle };
    }

    // Jika dalam mode edit dan index data yang diubah ditemukan
    if (mode === "edit" && editedIndex !== -1) {
      const updatedValues = [...values];
      updatedValues[editedIndex] = newData; // Ganti data yang lama dengan data yang baru
      handleChange(updatedValues);
    } else {
      handleChange([...values, newData]);
    }

    setData({
      title: "",
      price: "0",
      count: "",
      isFree: false,
      description: "",
    });
    setOpen((prev) => !prev);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <div className="group cursor-pointer">
          {mode === "edit" ? (
            <Button
              type="button"
              size="icon"
              variant="ghost">
              <Edit />
            </Button>
          ) : (
            <>
              <div className="relative hidden h-24 w-full rounded-[8px] bg-muted before:absolute before:left-[-15px] before:top-1/2 before:size-8 before:-translate-y-1/2 before:rounded-full before:bg-background group-hover:opacity-80 lg:inline-flex">
                <div className="relative flex size-full overflow-hidden before:absolute before:left-[48px] before:top-[-5px] before:size-3 before:rounded-full before:bg-background after:absolute after:bottom-[-5px] after:left-[48px] after:size-3 after:rounded-full after:bg-background">
                  <div className="flex w-[54px] items-center justify-center border-r-2 border-dashed border-[#DBDFE7] dark:border-[#DBDFE7]/20">
                    <div className="size-full py-5 pl-2">
                      <div className="relative h-full w-[54px]">
                        <Image
                          alt="barcode"
                          src="/assets/icons/icon-barcode.svg"
                          fill
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between p-4 text-foreground/80">
                    <p className="inline-flex flex-col text-lg ">
                      <span>Make a ticket</span>
                      <span className="font-bold">Paid</span>
                    </p>
                    <span>
                      <PlusCircleIcon size={40} />
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                className="w-full gap-2 lg:hidden">
                <PlusIcon />
                Create ticket
              </Button>
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Ticket</DialogTitle>
        </DialogHeader>
        <div>
          <Label>
            Ticket title <span className="text-primary">*</span>
          </Label>
          <Input
            placeholder="Title of your ticket"
            value={data.title}
            onChange={(e) =>
              setData({
                ...data,
                title: e.target.value,
              })
            }
            className="rounded-none border-x-0 border-b border-t-0 border-muted-foreground pb-2 pl-0 shadow-none focus:ring-0"
          />
        </div>
        <div>
          <Label>
            Ticket quantity <span className="text-primary">*</span>
          </Label>
          <Input
            placeholder="Your ticket quantity"
            type="number"
            value={data.count}
            onChange={(e) => {
              const value = e.target.value;
              const condition = parseInt(value) > 1000 ? "1000" : value;
              setData({
                ...data,
                count: condition,
              });
            }}
            className="rounded-none border-x-0 border-b border-t-0 border-muted-foreground pb-2 pl-0 shadow-none focus:ring-0"
          />
          <div className="flex justify-end">
            <span>
              {parseInt(data.count) > 1000
                ? "1000"
                : data.count === ""
                ? "0"
                : data.count}
            </span>
            <span>/</span>
            <span>1000</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5, // mengatur durasi transisi
                ease: "easeInOut", // menetapkan jenis transisi
              }}
              className={cn({ invisible: data.isFree })}>
              Ticket price <span className="text-primary">*</span>
            </motion.div>
            <Switch
              checked={data.isFree}
              onCheckedChange={() => {
                setData({
                  ...data,
                  isFree: !data.isFree,
                });
              }}
            />
          </div>
          <AnimatePresence>
            {!data.isFree && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5, // mengatur durasi transisi
                  ease: "easeInOut", // menetapkan jenis transisi
                }}
                className="relative">
                <span className="absolute top-[4px]">$</span>
                <Input
                  type="number"
                  placeholder="Price of your ticket"
                  value={data.price === "0" ? "" : data.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    const condition = parseInt(value) >= 500 ? "500" : value;
                    setData({
                      ...data,
                      price: condition,
                    });
                  }}
                  className="rounded-none border-x-0 border-b border-t-0 border-muted-foreground pb-2 pl-4 shadow-none focus:ring-0 "
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <Label>Ticket description</Label>
          <Textarea
            placeholder="Description of your ticket"
            value={data.description}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
            className="rounded-none border-x-0 border-b border-t-0 border-muted-foreground pb-2 pl-0 shadow-none focus-visible:border-b focus-visible:border-primary focus-visible:ring-0"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleClick}
            className="w-full">
            {mode === "edit" ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FieldTicket;
