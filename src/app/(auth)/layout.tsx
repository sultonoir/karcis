import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" closeButton />
    </>
  );
};

export default Layout;
