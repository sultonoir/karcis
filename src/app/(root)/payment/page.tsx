import PaymentCancle from "@/components/template/payment/PaymentCancle";
import PaymentItem from "@/components/template/payment/PaymentItem";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Confirm and pay",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const page = () => {
  return (
    <main className="container mt-5">
      <PaymentCancle />
      <div className="mt-5 grid h-full lg:grid-cols-2">
        {/* event payment */}
        <PaymentItem />
        {/* form payment */}
        <div>form payment</div>
      </div>
    </main>
  );
};

export default page;
