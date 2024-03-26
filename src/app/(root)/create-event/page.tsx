import FormCreateEvent from "@/components/template/form/formevent/FormCreateEvent";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Make your event in Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const page = async () => {
  const data = await getServerAuthSession();

  return (
    <div className="container mt-5 max-w-screen-lg">
      <FormCreateEvent user={data} />
    </div>
  );
};

export default page;
