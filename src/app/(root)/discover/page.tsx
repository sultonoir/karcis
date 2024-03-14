import DiscoverPage from "@/components/template/discover/DiscoverPage";
import { type Metadata } from "next";
import React from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Expolore your favorite event",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};
type Props = {
  searchParams: Record<string, unknown>;
};

const page = ({ searchParams }: Props) => {
  return <DiscoverPage searchParams={searchParams} />;
};

export default page;
