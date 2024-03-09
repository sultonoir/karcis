"use client";
import Loader from "@/components/shared/Loader";
import EventClient from "@/components/template/event/EventClient";
import { api } from "@/trpc/react";
import React from "react";

const page = () => {
  const { data, isLoading } = api.post.getAllEvents.useQuery();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {!data ? null : (
        <div className="container pt-10 lg:h-[95dvh]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {data.map((item) => (
              <EventClient events={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
