"use client";
import LoadingEvent from "@/components/shared/LoadingEvent";
import { api } from "@/trpc/react";
import React from "react";
import Container from "./Container";
import EmptyPage from "@/components/shared/EmptyPage";
import Image from "next/image";

const HomePopular = () => {
  const { data, isLoading } = api.post.popularEvent.useQuery();
  if (isLoading) {
    return (
      <Container className="container">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <LoadingEvent />
        </div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="container">
        <EmptyPage />
      </Container>
    );
  }
  return (
    <Container className="container" title="Popular event">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-9xl">{index + 1}</span>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={item.image?.url ?? ""}
                alt={item.title ?? "event"}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={item.blur}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomePopular;
