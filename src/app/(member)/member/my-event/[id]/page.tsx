import { api } from "@/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { DollarSignIcon, TicketIcon } from "lucide-react";
import { DataTable } from "@/components/template/order/DataTable";
import { columns } from "@/components/template/order/Columns";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const data = await api.revenue.getOrder.query({
    id: params.id,
  });
  return (
    <div className="container">
      <div className="mb-10 grid h-fit w-full grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon size={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalPrice}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total tickets sold
            </CardTitle>
            <TicketIcon size={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.ticketPurchase}</div>
          </CardContent>
        </Card>
      </div>
      <DataTable columns={columns} data={data.result} />
    </div>
  );
};

export default page;
