import { type Metadata } from "next";
import React from "react";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Your Profile - karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const page = () => {
  return <ProfileClient />;
};

export default page;
