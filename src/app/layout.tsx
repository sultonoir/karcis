import "../styles/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import SessionProvider from "@/components/provider/Provider";
import { ThemeProvider } from "@/components/provider/ThemeProvider";

export const metadata: Metadata = {
  title: "Rainame",
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
