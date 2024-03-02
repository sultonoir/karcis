import { type Events } from "@/xata";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import User from "@/components/shared/User";

interface Props {
  event: Events;
}

const EventDetails = ({ event }: Props) => {
  return (
    <section className="rounded-lg border p-4 shadow-sm">
      <h2 className="text-[20px] font-semibold">{event.title}</h2>
      <div className="mt-4 flex items-center gap-2">
        <Calendar className="text-muted-foreground" />
        <span>
          {format(event.startDate ?? "", "LLL dd, y")} -{" "}
          {format(event.endDate ?? "", "LLL dd, y")}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Clock className="text-muted-foreground" />
        <span>{event.time}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="h-[24px] w-[24px]">
          <MapPin className="text-muted-foreground" />
        </span>
        <span>
          {event.place}, {event.location}
        </span>
      </div>
      <div className="mt-10 border-t border-dashed pt-4">
        <User
          imageHeight="34px"
          imageWidth="34px"
          avatar={event.author?.image ?? "/logo.png"}
          name="Hosted By"
          classNames={{
            description: "font-medium text-[16px] text-foreground",
            name: "text-muted-foreground text-sm leading-3",
          }}
          description={<p>{event.author?.name}</p>}
        />
      </div>
    </section>
  );
};

export default EventDetails;
