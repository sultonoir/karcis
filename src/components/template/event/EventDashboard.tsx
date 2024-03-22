import { type Events } from "@/xata";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
interface Props {
  event: Events;
}

const EventDashboard = ({ event }: Props) => {
  return (
    <Link
      href={`/member/my-event/${event.id}`}
      className="group relative flex w-full flex-col gap-2 overflow-hidden rounded-lg border shadow-sm"
    >
      <div className="absolute inset-0 z-50 bg-background/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex size-full items-center justify-center">
          <p className="flex w-fit rounded-md bg-primary px-4 py-2 text-white">
            Details
          </p>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={event.image?.url ?? "/logo.png"}
          fill
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-video object-cover"
        />
      </div>
      <div className="flex flex-col justify-between gap-2 p-4">
        <div className="flex flex-col">
          <p>Category</p>
          <p className="text-sm text-muted-foreground">{event.category}</p>
        </div>
        <div className="flex flex-col">
          <p>Event date</p>
          <p className="text-sm text-muted-foreground">
            <>
              {format(event.startDate, "LLL dd, y")} -{" "}
              {format(event.endDate, "LLL dd, y")}
            </>
          </p>
        </div>
        <div className="flex flex-col">
          <p>Location</p>
          <p className="text-sm text-muted-foreground">{event.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventDashboard;
