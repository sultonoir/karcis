import { type Events } from "@/xata";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  event: Events;
}

const EventBreadcrumb = ({ event }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/" className="text-primary hover:opacity-80">
        Home
      </Link>
      <ChevronRight />
      <Link
        href={`/discover?category=${event?.category}`}
        className="text-primary hover:opacity-80"
      >
        {event.category}
      </Link>
      <ChevronRight />
      <p className="text-muted-foreground">{event.title}</p>
    </div>
  );
};

export default EventBreadcrumb;
