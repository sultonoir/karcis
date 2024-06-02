import SettingSidebar from "@/components/template/settings/setting-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Settings - Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container py-8">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto flex w-full max-w-6xl gap-2">
          <Link
            href="/"
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingSidebar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
