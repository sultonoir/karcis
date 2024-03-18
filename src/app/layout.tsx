import "../styles/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import SessionProvider from "@/components/provider/Provider";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Karcisku",
  description: "Reserve, Create, Celebrate: Your Event, Your Rules!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TRPCReactProvider cookies={cookies().toString()}>
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
