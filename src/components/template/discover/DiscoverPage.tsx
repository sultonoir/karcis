"use client";
import LoadingEvent from "@/components/shared/LoadingEvent";
import Event from "@/components/template/event/Event";
import { api } from "@/trpc/react";
import Header from "@/components/template/navbar/Header";
import React from "react";
import DiscoverSelect from "./DiscoverSelect";
import Image from "next/image";
import CategoryBar from "@/components/shared/CategoryBar";

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
        <div className="container flex items-center justify-between py-2">
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
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              alt="no-result"
              src="/no-result.svg"
              width={200}
              height={100}
              priority
              loading="eager"
            />
            <h2 className="text-lg font-extrabold leading-none">
              Search Result not found
            </h2>
            <p className="max-w-md text-center">
              We can&apos;t find the event with these search keywords, please
              pay attention to the spelling or search again.
            </p>
          </div>
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
