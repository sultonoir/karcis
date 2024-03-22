import EventDashboard from "@/components/template/event/EventDashboard";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import React from "react";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const data = await api.post.getDetailMyevent.query({
    eventId: params.id,
  });
  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {data.event && <EventDashboard event={data.event} />}
        <div className="grid h-fit w-full grid-cols-1 gap-4">
          <div className="flex flex-col rounded-md border p-4">
            <div className="flex items-center justify-between pb-3">
              <p className="text-lg font-medium leading-none">
                Total tickets sold
              </p>
            </div>
            <Separator />
            <div className="pt-2 text-2xl font-semibold">
              {data.ticketPurchase} Ticket
            </div>
          </div>
          <div className="flex flex-col rounded-md border p-4">
            <div className="flex items-center justify-between pb-3">
              <p className="text-lg font-medium leading-none">Total revenue</p>
            </div>
            <Separator />
            <div className="pt-2 text-2xl font-semibold">
              ${data.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
