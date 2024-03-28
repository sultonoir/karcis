"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Check, DollarSignIcon, TicketIcon } from "lucide-react";
import { DataTable } from "@/components/template/order/DataTable";
import { columns } from "@/components/template/order/Columns";
import { api } from "@/trpc/react";
import Loader from "@/components/shared/Loader";
import EmptyPage from "@/components/shared/EmptyPage";

interface Props {
  id: string;
}

const EventClient = ({ id }: Props) => {
  const { data, isLoading } = api.revenue.getOrder.useQuery({
    id,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <EmptyPage />;
  }

  return (
    <div className="container">
      <div className="mb-10 grid h-fit w-full grid-cols-1 gap-4 lg:grid-cols-3">
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-in</CardTitle>
            <Check size={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalStatus}</div>
          </CardContent>
        </Card>
      </div>
      <DataTable columns={columns} data={data.result} />
    </div>
  );
};

export default EventClient;
