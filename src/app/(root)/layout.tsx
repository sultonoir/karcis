import Footer from "@/components/template/navbar/Footer";
import Navbar from "@/components/template/navbar/Navbar";
import MobileNavbar from "@/components/template/navbar/search/MobileNavbar";
import SearchDialog from "@/components/template/navbar/search/SearchDialog";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <div className="mb-8 lg:mb-0">
        <Navbar />
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
