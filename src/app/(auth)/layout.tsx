import { Toaster } from "@/components/ui/sonner";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </>
  );
};

export default Layout;
