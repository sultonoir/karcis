import { Overview } from "@/components/shared/Overview";
import RecentPurchased from "@/components/shared/RecentPurchased";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/server";
import { DollarSignIcon, TicketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";
const page = async () => {
  const data = await api.revenue.getRevenue.query();
  return (
    <div className="container">
      <div className="grid h-fit w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event active</CardTitle>
            <Link href="/member/my-event">Details</Link>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalEvent}</div>
          </CardContent>
        </Card>
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
            <div className="text-2xl font-bold">{data.totalTicket}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview of tickets sold</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview cart={data.cart} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {data.recent.map((item) => (
                <RecentPurchased recent={item} key={item.id} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
