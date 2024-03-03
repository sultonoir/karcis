import React from "react";
import { api } from "@/trpc/server";
import { type Events, getXataClient, type Tikets } from "@/xata";
import { type Metadata } from "next";
import EventPayment from "@/components/template/event/EventPayment";
import EventDetails from "@/components/template/event/EventDetails";
import EventTab from "@/components/template/event/EventTab";
import EventBreadcrumb from "@/components/template/event/EventBreadcrumb";
import EventHero from "@/components/template/event/EventHero";
import EventMobilePayment from "@/components/template/event/EventMobilePayment";

export const dynamic = "force-dynamic";
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
    <main className="container relative my-5">
      <EventBreadcrumb event={event} />
      <div className="mt-5 flex flex-col gap-2 lg:flex-row lg:gap-5">
        <div className="flex flex-1 flex-col gap-2">
          <EventHero image={event.image?.url ?? ""} blur={event.blur} />
          <div className="block lg:hidden">
            <EventDetails event={event} />
          </div>
          <EventTab ticket={ticket} event={event} />
        </div>
        <div className="relative hidden gap-10 lg:flex lg:w-[350px] lg:flex-col">
          <EventDetails event={event} />
          <EventPayment minPrice={minPrice} event={event} />
        </div>
      </div>
      <EventMobilePayment minPrice={minPrice} event={event} />
    </main>
  );
};

export default Page;
