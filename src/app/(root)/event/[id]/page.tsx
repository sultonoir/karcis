import React from "react";
import Preview from "@/components/shared/Preview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { api } from "@/trpc/server";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketCard from "@/components/shared/TicketCard";
import { type Events, getXataClient, type Tikets } from "@/xata";
import TicketQuantity from "@/components/template/event/TicketQuantity";
import { type Metadata } from "next";
import EventPayment from "@/components/template/event/EventPayment";
import EventDetails from "@/components/template/event/EventDetails";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const xata = getXataClient();
  const data = await xata.db.events.read(params.id);

  return {
    title: data?.title ?? "Karcisku",
    generator: data?.tag?.toString(),
    description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
    metadataBase: new URL("https://kyoshop.vercel.app/"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: data?.title ?? "Karcisku",
      description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
      url: "https://kyoshop.vercel.app/",
      siteName: "KyouShop",
      images: [
        {
          url: data?.image?.url ?? "",
          width: 800,
          height: 600,
        },
        {
          url: data?.image?.url ?? "",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      site: "https://kyoshop.vercel.app/",
      title: "KyouShop",
      description: "KyouShop easy shopping for everyone",
      images: [
        {
          url: data?.image?.url ?? "",
          width: 800,
          height: 600,
        },
        {
          url: data?.image?.url ?? "",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await api.post.getEvent.query({
    eventId: params.id,
  });
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
    <main className="container my-5">
      <div className="flex flex-wrap gap-2">
        <Link href="/" className="text-primary">
          Home
        </Link>
        <ChevronRight />
        <Link
          href={`/discover?category=${data.event?.category}`}
          className="text-primary"
        >
          {data.event?.category}
        </Link>
        <ChevronRight />
        <p className="text-muted-foreground">{data.event?.title}</p>
      </div>
      <div className="mt-5 flex flex-col gap-2 lg:flex-row lg:gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <AspectRatio
            ratio={16 / 9}
            className="relative mb-2 overflow-hidden rounded-md bg-muted"
          >
            <Image
              src={data.event?.image?.url ?? ""}
              alt="Photo by Drew Beamer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              fill
              placeholder="blur"
              blurDataURL={data.event?.blur}
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <div className="block lg:hidden">
            <EventDetails event={event} />
          </div>
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-between lg:h-16">
              <TabsTrigger
                className="flex w-full justify-center lg:h-14"
                value="description"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                className="flex w-full justify-center lg:h-14"
                value="ticket"
              >
                Ticket
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="flex flex-col gap-2 lg:gap-10"
            >
              <Preview values={data.event?.description} />
              <h3 className="relative">
                <span
                  aria-label="Terms & Conditions"
                  aria-hidden
                  className="absolute bottom-0 top-0 w-1 bg-primary"
                />
                <span className="pl-2 text-2xl">Terms & Conditions</span>
              </h3>
              <Preview values={data.event?.term} />
              <h3 className="relative">
                <span
                  aria-label="Terms & Conditions"
                  aria-hidden
                  className="absolute bottom-0 top-0 w-1 bg-primary"
                />
                <span className="pl-2 text-2xl">Tag</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.event?.tag?.map((item, index) => (
                  <div key={index} className="rounded-full bg-accent px-3 py-1">
                    {item}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ticket">
              <div className="grid gap-2">
                {ticket.map((item) => (
                  <TicketCard
                    key={item.id}
                    value={item}
                    actions={
                      <TicketQuantity
                        eventId={data.event?.id ?? ""}
                        ticket={item}
                        max={item.max}
                      />
                    }
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="relative hidden gap-10 lg:flex lg:w-[350px] lg:flex-col">
          <EventDetails event={event} />
          <EventPayment minPrice={minPrice} eventId={event.id} />
        </div>
      </div>
    </main>
  );
};

export default Page;
