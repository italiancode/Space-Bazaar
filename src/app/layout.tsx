"use client";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import AccountLayout from "@/components/layout/AccountLayout";
import { Providers } from "@/components/providers/index";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: Metadata = {
  title: "Space Bazaar | SpaceX Merchandise Marketplace",
  description:
    "Buy and sell SpaceX merchandise while supporting space exploration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAccountRoute = pathname.startsWith("/account");

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          {isAccountRoute ? <AccountLayout>{children}</AccountLayout> : <Layout>{children}</Layout>}
        </Providers>
      </body>
    </html>
  );
}
