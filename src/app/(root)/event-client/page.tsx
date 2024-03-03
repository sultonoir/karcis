"use client";
import Event from "@/components/template/event/Event";
import { api } from "@/trpc/react";
import React from "react";

const page = () => {
  const { data } = api.post.getAllEvents.useQuery();

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5">
        {data?.map((item) => {
          return <Event events={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default page;
