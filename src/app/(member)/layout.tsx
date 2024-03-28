import Header from "@/components/template/navbar/Header";
import Profile from "@/components/template/navbar/Profile";
import Sidebar from "@/components/template/navbar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Calendar } from "lucide-react";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
        <Sidebar />
      </div>
      <main className="h-full md:pl-56">
        <Header>
          <div className="flex items-center justify-end gap-5 px-10 py-2">
            <Link
              href="/create-event"
              className="flex h-9 items-center gap-2 rounded-md px-4 py-2 hover:bg-primary/20 hover:text-primary"
            >
              <Calendar />
              Create event
            </Link>
            <Profile data={session} />
          </div>
        </Header>
        <div className="py-10">{children}</div>
      </main>
      <Toaster richColors closeButton position="bottom-left" />
    </div>
  );
};

export default layout;
