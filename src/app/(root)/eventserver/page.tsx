import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const events = await api.post.getAllPosts.query();
  return (
    <div className="container grid grid-cols-2">
      {events.map((item) => (
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

export default Page;
