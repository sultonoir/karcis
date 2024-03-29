"use client";
import { api } from "@/trpc/react";
import React from "react";
import Container from "./Container";
import LoadingEvent from "@/components/shared/LoadingEvent";
import EmptyPage from "@/components/shared/EmptyPage";
import Event from "../event/Event";

interface Props {
  category?: string;
  title?: string;
}

const HomeCategory = ({
  category = "festival",
  title = "Festival fair",
}: Props) => {
  const { data, isLoading } = api.post.getAllEvents.useQuery({
    category,
  });

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
    <Container className="container">
      <EmptyPage />
    </Container>;
  }

  return (
    <Container className="container" title={title}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {data?.records.map((item) => <Event events={item} key={item.id} />)}
      </div>
    </Container>
  );
};

export default HomeCategory;
