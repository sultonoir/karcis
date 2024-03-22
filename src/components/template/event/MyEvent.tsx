"use client";
import LoadingEvent from "@/components/shared/LoadingEvent";
import { api } from "@/trpc/react";
import React from "react";
import EventDashboard from "./EventDashboard";
import EmptyPage from "@/components/shared/EmptyPage";

interface Props {
  active: boolean;
}

const MyEvent = ({ active }: Props) => {
  const { data, isLoading } = api.post.getMyEvent.useQuery({
    active,
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <LoadingEvent />
      </div>
    );
  }
  if (!data) {
    return <EmptyPage descriptions="you don't have an event yet" />;
  }
  return (
    <div className="py-10">
      {data.length === 0 ? (
        <div className="flex size-full items-center justify-center">
          <EmptyPage descriptions="you don't have an event yet" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {data?.map((item) => <EventDashboard key={item.id} event={item} />)}
        </div>
      )}
    </div>
  );
};

export default MyEvent;
