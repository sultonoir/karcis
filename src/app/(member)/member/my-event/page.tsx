import { type Metadata } from "next";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyEvent from "@/components/template/event/MyEvent";

export const metadata: Metadata = {
  title: "My event - Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};
const page = () => {
  return (
    <div className="container">
      <Tabs defaultValue="event-active">
        <TabsList className="h-12 w-full justify-between lg:h-16">
          <TabsTrigger
            value="event-active"
            className="flex h-10 w-full justify-center lg:h-14 lg:text-lg"
          >
            Event active
          </TabsTrigger>
          <TabsTrigger
            value="past-event"
            className="flex h-10 w-full justify-center lg:h-14 lg:text-lg"
          >
            Past event
          </TabsTrigger>
        </TabsList>
        <TabsContent value="event-active">
          <MyEvent active />
        </TabsContent>
        <TabsContent value="past-event">
          <MyEvent active={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
