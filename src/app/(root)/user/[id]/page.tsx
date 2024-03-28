import { api } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";
import UserClient from "./UserClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await api.user.getPublicProfile.query({
    id: params.id,
  });

  return {
    title: data.user?.name ?? "Karcisku",
    generator: "event, reservation,",
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
      title: data.user?.name ?? "Karcisku",
      description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
      url: "https://kyoshop.vercel.app/",
      siteName: "KyouShop",
      images: [
        {
          url: data.user?.image ?? "",
          width: 800,
          height: 600,
        },
        {
          url: data.user?.image ?? "",
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
          url: data.user?.image ?? "",
          width: 800,
          height: 600,
        },
        {
          url: data.user?.image ?? "",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
    },
  };
}

const page = ({ params }: Props) => {
  return <UserClient id={params.id} />;
};

export default page;
