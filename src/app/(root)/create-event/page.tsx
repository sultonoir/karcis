import FormCreateEvent from "@/components/template/form/formevent/FormCreateEvent";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const data = await getServerAuthSession();

  if (!data) {
    redirect("/login");
  }

  return (
    <div className="container mt-5 max-w-screen-lg">
      <FormCreateEvent user={data} />
    </div>
  );
};

export default page;
