"use client";
import EmptyPage from "@/components/shared/EmptyPage";
import LoadingUser from "@/components/shared/LoadingUser";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Event from "@/components/template/event/Event";
interface Props {
  id: string;
}

const UserClient = ({ id }: Props) => {
  const { data, isLoading } = api.user.getPublicProfile.useQuery({
    id,
  });

  if (isLoading) {
    return (
      <div className="container min-h-screen pb-10">
        <LoadingUser />
      </div>
    );
  }

  if (!data?.user) {
    return (
      <div className="container min-h-screen py-10">
        <EmptyPage
          title="event creator's not found"
          descriptions="we couldn't find the event creator's name."
        />
      </div>
    );
  }

  return (
    <div className="container min-h-screen py-5">
      <div className="relative h-[100px] overflow-hidden rounded-sm bg-accent lg:h-[250px]">
        {data.user.banner?.url && (
          <Image
            src={data.user.banner?.url ?? ""}
            alt="banner"
            fill
            priority
            loading="eager"
            className="aspect-video object-cover"
            sizes="(min-width: 1480px) 90vw, (min-width: 1040px) 17.14vw, (min-width: 780px) calc(33.33vw - 37px), calc(100vw - 66px)"
          />
        )}
      </div>
      <div className="flex h-fit flex-row items-center gap-2 overflow-hidden bg-background p-1 lg:gap-10">
        <div className="relative z-10 size-16 flex-shrink-0 overflow-hidden rounded-full bg-background p-1 lg:ml-10 lg:size-40">
          <Image
            src={data.user.image ?? "/placeholder.jpg"}
            alt={data.user.name ?? "user-1"}
            fill
            priority
            loading="eager"
            className="rounded-full p-1"
          />
        </div>
        <div className="flex flex-col">
          <p className="block font-bold lg:text-4xl">{data.user.name}</p>
          <p className="text-muted-foreground">
            Joined since {data.user.xata.createdAt.getFullYear()}
          </p>
          <p className="hidden max-w-[500px] truncate text-muted-foreground lg:block">
            {data.user.about}
          </p>
          <div className="mt-2 hidden items-center gap-5 lg:flex">
            {data.user.facebook && (
              <Link href={data.user.facebook}>
                <FaFacebook className="size-8" />
              </Link>
            )}
            {data.user.instagram && (
              <Link href={data.user.instagram}>
                <FaInstagram className="size-8" />
              </Link>
            )}
            {data.user.twitter && (
              <Link href={data.user.twitter}>
                <FaTwitter className="size-8" />
              </Link>
            )}
            {data.user.tiktok && (
              <Link href={data.user.tiktok}>
                <FaTiktok className="size-8" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <p
          className="text-sm text-muted-foreground lg:hidden"
          style={{
            width: "250px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {data.user.about}
        </p>
      </div>
      <Tabs defaultValue="event-active" className="mt-10">
        <TabsList className="h-12">
          <TabsTrigger
            value="event-active"
            className="flex h-10 w-full justify-center"
          >
            Event active
          </TabsTrigger>
          <TabsTrigger
            value="past-event"
            className="flex h-10 w-full justify-center"
          >
            Past event
          </TabsTrigger>
        </TabsList>
        <TabsContent value="event-active">
          {data.eventActive.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              {data.eventActive.map((item) => (
                <Event events={item} key={item.id} />
              ))}
            </div>
          ) : (
            <EmptyPage descriptions="creator does not have any current events" />
          )}
        </TabsContent>
        <TabsContent value="past-event">
          {data.pastEvent.length ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              {data.pastEvent.map((item) => (
                <Event events={item} key={item.id} />
              ))}
            </div>
          ) : (
            <EmptyPage descriptions="creator does not have any current events" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserClient;
