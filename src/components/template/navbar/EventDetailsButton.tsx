"use client";
import React from "react";
import { Banknote, Loader2Icon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Separator } from "@/components/ui/separator";

const EventDetailsButton = () => {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const { data, isLoading } = api.post.getEvent.useQuery({
    eventId: params.id,
  });
  return (
    <>
      {params.id && (
        <React.Fragment>
          <p className="pt-2 font-medium text-muted-foreground">
            Event Dashboard
          </p>
          <Link
            href={`/member/my-event/${params.id}`}
            className={cn(
              "flex h-10 items-center gap-2 rounded-md px-3 py-1 transition-transform duration-300 hover:translate-x-2",
              {
                "bg-primary text-white":
                  `/member/my-event/${params.id}` === pathname,
              },
            )}
          >
            {isLoading ? (
              <span className="inline-flex w-full items-center justify-center">
                <Loader2Icon className="animate-spin" />
              </span>
            ) : (
              <span className="block w-full truncate">
                {data?.event?.title}
              </span>
            )}
          </Link>
          <Link
            href={`/member/my-event/${params.id}/ordering-data`}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1 transition-transform duration-300 hover:translate-x-2",
              {
                "bg-primary text-white":
                  `/member/my-event/${params.id}/ordering-data` === pathname,
              },
            )}
          >
            <span className="inline-flex size-10 items-center justify-center rounded-md  p-1">
              <Banknote size={24} />
            </span>
            Ordering data
          </Link>
          <Separator />
        </React.Fragment>
      )}
    </>
  );
};

export default EventDetailsButton;
