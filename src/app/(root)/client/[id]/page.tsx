import { getXataClient } from "@/xata";
import { type Metadata } from "next";
import React from "react";
import PageClient from "./PageClient";
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

const page = ({ params }: { params: { id: string } }) => {
  return <PageClient id={params.id} />;
};

export default page;
