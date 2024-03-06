import Footer from "@/components/template/navbar/Footer";
import Header from "@/components/template/navbar/Header";
import MobileNavbar from "@/components/template/navbar/MobileNavbar";
import SearchDialog from "@/components/template/navbar/search/SearchDialog";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="mb-8 lg:mb-0">
        <Header />
        {children}
        <Footer />
        <MobileNavbar />
      </div>
      <SearchDialog />
      <Toaster richColors closeButton position="top-right" />
    </React.Fragment>
  );
};

export default Layout;
