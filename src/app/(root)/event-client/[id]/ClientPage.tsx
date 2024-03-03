"use client";
import Loader from "@/components/shared/Loader";
import EventBreadcrumb from "@/components/template/event/EventBreadcrumb";
import EventDetails from "@/components/template/event/EventDetails";
import EventHero from "@/components/template/event/EventHero";
import EventMobilePayment from "@/components/template/event/EventMobilePayment";
import EventPayment from "@/components/template/event/EventPayment";
import EventTab from "@/components/template/event/EventTab";
import { api } from "@/trpc/react";
import { type Events, type Tikets } from "@/xata";
import { redirect } from "next/navigation";
import React from "react";

const ClientPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = api.post.getEvent.useQuery({
    eventId: params.id,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    redirect("/event-client");
  }

  const parse: Tikets[] = JSON.parse(JSON.stringify(data.ticket));
  const ticket = parse.map((item) => ({
    ...item,
    title: item.title ?? "",
    price: item.price.toString(),
    description: item.description ?? "",
    count: item.count.toString(),
  }));

  const minPrice = data.ticket[0]?.price;
  const event: Events = JSON.parse(JSON.stringify(data.event));
  return (
    <main className="container relative my-5">
      <EventBreadcrumb event={event} />
      <div className="mt-5 flex flex-col gap-2 lg:flex-row lg:gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <EventHero image={event.image?.url ?? ""} blur={event.blur} />
          <div className="block lg:hidden">
            <EventDetails event={event} />
          </div>
          <EventTab ticket={ticket} event={event} />
        </div>
        <div className="relative hidden gap-10 lg:flex lg:w-[350px] lg:flex-col">
          <EventDetails event={event} />
          <EventPayment minPrice={minPrice} eventId={event.id} />
        </div>
      </div>
      <EventMobilePayment minPrice={minPrice} eventId={event.id} />
    </main>
  );
};

export default ClientPage;
