import Header from "@/components/template/navbar/Header";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};

export default Layout;
