"use client";
import type { Events } from "@/xata";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import User from "@/components/shared/User";
import { api } from "@/trpc/react";

interface Props {
  events: Events;
}

const Event = ({ events }: Props) => {
  const { data } = api.post.getPrice.useQuery({
    eventId: events.id,
  });

  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={16 / 9} className="mb-2 bg-muted">
        <Link href={`/event/${events.id}`}>
          <Image
            src={events.image?.url ?? ""}
            alt="Photo by Drew Beamer"
            fill
            className="object-cover"
          />
        </Link>
      </AspectRatio>
      <CardContent className="px-2">
        <Link
          href={`/event/${events.id}`}
          className="block w-full truncate hover:text-primary/80"
        >
          {events.title?.toString()}
        </Link>
        <div className="mt-2 text-sm text-muted-foreground">
          {format(events.startDate ?? "", "LLL dd, y")} -{" "}
          {format(events.startDate ?? "", "LLL dd, y")}
        </div>
        <div className="text-lg font-bold">${data?.price}</div>
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <User
          avatar={"/logo.png"}
          imageWidth="30px"
          imageHeight="30px"
          name={events.author?.name}
        />
      </CardFooter>
    </Card>
  );
};

export default Event;
