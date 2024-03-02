import Footer from "@/components/template/navbar/Footer";
import React, { type PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-8 lg:mb-0">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
