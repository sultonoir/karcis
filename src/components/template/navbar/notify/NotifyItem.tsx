"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";
import React from "react";
import { DotIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import fromNow from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import NotifyLoading from "./NotifyLoading";
import { toast } from "sonner";

dayjs.extend(fromNow);

const NotifyItem = () => {
  const { data, isLoading } = api.notify.getAllNotify.useQuery();
  const ctx = api.useUtils();
  const { mutate } = api.notify.readsNotify.useMutation({
    onSuccess: async () => {
      await ctx.notify.getAllNotify.invalidate();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return (
    <>
      {isLoading ? (
        <NotifyLoading />
      ) : (
        <>
          {!data ? (
            <React.Fragment>
              <Image
                alt="empty Notifications"
                src="/empty-box.svg"
                width={300}
                height={100}
                className="aspect-video"
                priority
                loading="eager"
              />
              <p className="pt-3 text-center">Notifications empty</p>
            </React.Fragment>
          ) : (
            <>
              {data?.length === 0 ? (
                <React.Fragment>
                  <Image
                    alt="empty Notifications"
                    src="/empty-box.svg"
                    width={300}
                    height={100}
                    className="aspect-video"
                    priority
                    loading="eager"
                  />
                  <p className="pt-3 text-center">Notifications empty</p>
                </React.Fragment>
              ) : (
                <ScrollArea className="h-72">
                  <div className="pr-4">
                    {data?.map((item) => (
                      <React.Fragment key={item.id}>
                        <Link
                          href={
                            item.type === "payment"
                              ? "/member/my-ticket"
                              : "/member/my-event"
                          }
                          onClick={() =>
                            mutate({
                              id: item.id,
                            })
                          }
                          className={cn(
                            "my-1 flex gap-2 rounded-sm p-2 hover:bg-accent",
                          )}
                        >
                          <div className="relative size-14 flex-shrink-0">
                            <Image
                              alt={item.event?.title ?? "image"}
                              src={item.event?.image?.url ?? ""}
                              fill
                              placeholder="blur"
                              blurDataURL={item.event?.blur}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h3 className="leading-tight">{item.message}</h3>
                            <p className="text-sm text-muted-foreground">
                              {`${dayjs(item.xata.createdAt).fromNow()}`}
                            </p>
                          </div>
                          {!item.isRead && (
                            <div className="flex-shrink-0">
                              <DotIcon className="text-primary" />
                            </div>
                          )}
                        </Link>
                        <Separator />
                      </React.Fragment>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default NotifyItem;
