"use client";
import { api } from "@/trpc/react";
import Image from "next/image";
import React from "react";
import { TbLoader3 } from "react-icons/tb";

const page = () => {
  const events = api.post.getAllPosts.useQuery();
  if (events.isLoading) {
    return (
      <div className="fixed inset-0">
        <div className="flex size-full items-center justify-center gap-2 text-4xl">
          <TbLoader3 size={30} className="h-4 w-4 animate-spin" />
          loading
        </div>
      </div>
    );
  }
  return (
    <div className="container grid grid-cols-2">
      {events.data?.map((item) => (
        <div className="flex gap-5" key={item.id}>
          <div className="relative h-[200px] w-[200px] ">
            <Image
              alt={item.name ?? ""}
              src="/assets/images/hero.png"
              fill
              priority
            />
          </div>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default page;
