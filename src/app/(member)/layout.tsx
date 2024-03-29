import Header from "@/components/template/navbar/Header";
import MobileMenu from "@/components/template/navbar/MobileMenu";
import Profile from "@/components/template/navbar/Profile";
import Sidebar from "@/components/template/navbar/Sidebar";
import Notify from "@/components/template/navbar/notify/Notify";
import { Toaster } from "@/components/ui/sonner";
import { getServerAuthSession } from "@/server/auth";
import { Calendar, CalendarPlus } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
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
          <div className="flex items-center justify-between px-10 py-2 lg:justify-end">
            <div className="flex items-center gap-2 lg:hidden">
              <MobileMenu />
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={34}
                  height={34}
                  loading="eager"
                  priority
                  className="rounded-sm"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/create-event"
                title="Create event"
                className="flex h-9 items-center gap-2 rounded-md px-4 py-2 hover:bg-primary/20 hover:text-primary"
              >
                <CalendarPlus className="block lg:hidden" />
                <Calendar className="hidden lg:block" />
                <span className="hidden lg:block">Create event</span>
              </Link>
              <Notify />
              <Profile data={session} />
            </div>
          </div>
        </Header>
        <div className="py-10">{children}</div>
      </main>
      <Toaster richColors closeButton position="bottom-left" />
    </div>
  );
};

export default layout;
