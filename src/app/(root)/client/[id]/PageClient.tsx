"use client";
import React from "react";
import Loader from "@/components/shared/Loader";
import EventPayment from "@/components/template/event/EventPayment";
import EventDetails from "@/components/template/event/EventDetails";
import EventTab from "@/components/template/event/EventTab";
import EventBreadcrumb from "@/components/template/event/EventBreadcrumb";
import EventHero from "@/components/template/event/EventHero";
import EventMobilePayment from "@/components/template/event/EventMobilePayment";
import { api } from "@/trpc/react";
import type { Events, Tikets } from "@/xata";

interface Props {
  id: string;
}

const PageClient = ({ id }: Props) => {
  const { data, isLoading } = api.post.getEvent.useQuery({
    eventId: id,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
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
          <EventPayment minPrice={minPrice} event={event} />
        </div>
      </div>
      <EventMobilePayment minPrice={minPrice} event={event} />
    </main>
  );
};

export default PageClient;
