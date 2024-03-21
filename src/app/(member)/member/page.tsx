import EventDashboard from "@/components/template/event/EventDashboard";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const page = async () => {
  const data = await api.revenue.getRevenue.query();
  return (
    <div className="container">
      <div className="grid h-fit w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col rounded-md border p-4">
          <div className="flex items-center justify-between pb-2">
            <p className="text-lg font-medium leading-none">Event active</p>
            <Link href="/member/my-event">Details</Link>
          </div>
          <Separator />
          <div className="pt-2 text-2xl font-semibold">
            {data.totalEvent} Events
          </div>
        </div>
        <div className="flex flex-col rounded-md border p-4">
          <div className="flex items-center justify-between pb-3">
            <p className="text-lg font-medium leading-none">
              Total tickets sold
            </p>
          </div>
          <Separator />
          <div className="pt-2 text-2xl font-semibold">
            {data.totalTicket} Ticket
          </div>
        </div>
        <div className="flex flex-col rounded-md border p-4">
          <div className="flex items-center justify-between pb-3">
            <p className="text-lg font-medium leading-none">Total revenue</p>
          </div>
          <Separator />
          <div className="pt-2 text-2xl font-semibold">${data.totalPrice}</div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.events.map((item) => (
          <EventDashboard event={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default page;
