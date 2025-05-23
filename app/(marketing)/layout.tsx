import { Navbar } from "@/components/marketing/navbar";
import React from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full">{children}</main>
    </div>
  );
}
