"use client";
import LoadingEvent from "@/components/shared/LoadingEvent";
import Event from "@/components/template/event/Event";
import { api } from "@/trpc/react";
import Header from "@/components/template/navbar/Header";
import React from "react";
import DiscoverSelect from "./DiscoverSelect";
import CategoryBar from "@/components/shared/CategoryBar";
import EmptyPage from "@/components/shared/EmptyPage";

type Props = {
  searchParams: Record<string, unknown>;
};

const DiscoverPage = ({ searchParams }: Props) => {
  const category = (searchParams.category as string) ?? undefined;
  const startDate = (searchParams.startDate as string) ?? undefined;
  const endDate = (searchParams.endDate as string) ?? undefined;
  const { data: page, isLoading } = api.post.getAllEvents.useQuery({
    category,
    startDate,
    endDate,
  });

  return (
    <React.Fragment>
      <Header className="top-[69px] border-none">
        <div className="container flex items-center gap-4 py-2 md:justify-between">
          <CategoryBar />
          <DiscoverSelect />
        </div>
      </Header>
      <div className="container min-h-[90dvh] py-10">
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
            <LoadingEvent />
          </div>
        )}
        {page?.records.length === 0 ? (
          <EmptyPage />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {page?.records.map((item) => {
              return <Event events={item} key={item.id} />;
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DiscoverPage;
