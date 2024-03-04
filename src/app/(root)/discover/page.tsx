import Event from "@/components/template/event/Event";
import { api } from "@/trpc/server";
import { type Events } from "@/xata";
import React from "react";
export const dynamic = "force-dynamic";

const page = async () => {
  const events = await api.post.getAllEvents.query();
  const parse: Events[] = JSON.parse(JSON.stringify(events));
  return (
    <div className="container pt-10 lg:h-[95dvh]">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {parse.map((item) => {
          return <Event events={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default page;
