import { columns } from "@/components/template/tableticket/Columns";
import { DataTable } from "@/components/template/tableticket/DataTable";
import { api } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";
const page = async () => {
  const data = await api.user.getMyTicket.query();
  return (
    <div className="container">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
