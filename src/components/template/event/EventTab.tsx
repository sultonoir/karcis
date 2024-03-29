"use client";
import React from "react";
import type { Events } from "@/xata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketCard from "@/components/shared/TicketCard";
import Preview from "@/components/shared/Preview";
import useTabs from "@/hooks/useTabs";
import EventQuantity from "./EventQuantity";
interface Data {
  id: string;
  title: string;
  price: string;
  count: string;
  isFree: boolean;
  description?: string | undefined;
  max: number;
}
interface Props {
  event: Events;
  ticket: Data[];
}

const EventTab = ({ event, ticket }: Props) => {
  const { value, onChange } = useTabs();
  return (
    <Tabs
      value={value}
      onValueChange={() => onChange(value)}
      defaultValue="description"
    >
      <TabsList className="w-full justify-between lg:h-16">
        <TabsTrigger
          className="flex w-full justify-center lg:h-14 lg:text-lg"
          value="description"
          onClick={() => onChange("description")}
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          className="flex w-full justify-center lg:h-14 lg:text-lg"
          value="ticket"
          onClick={() => onChange("ticket")}
        >
          Ticket
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="description"
        className="flex flex-col gap-2 lg:gap-10"
      >
        <Preview values={event?.description} />
        <h3 className="relative">
          <span
            aria-label="Terms & Conditions"
            aria-hidden
            className="absolute bottom-0 top-0 w-1 bg-primary"
          />
          <span className="pl-2 text-2xl">Terms & Conditions</span>
        </h3>
        <Preview values={event?.term} />
        <h3 className="relative">
          <span
            aria-label="Terms & Conditions"
            aria-hidden
            className="absolute bottom-0 top-0 w-1 bg-primary"
          />
          <span className="pl-2 text-2xl">Tag</span>
        </h3>
        <div className="flex w-full flex-wrap gap-2">
          {event?.tag?.map((item, index) => (
            <div key={index} className="rounded-full bg-accent px-3 py-1">
              {item}
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent
        value="ticket"
        className="flex flex-col justify-start gap-2 lg:gap-10"
      >
        {ticket.map((item) => (
          <TicketCard
            key={item.id}
            value={item}
            actions={
              <EventQuantity
                eventId={event?.id ?? ""}
                ticket={item}
                max={item.max}
              />
            }
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default EventTab;
