"use client";

import Header from "@/components/account/Header";
import Footer from "@/components/layout/Footer";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white">
      <Header />
      <main className="max-w-7xl mx-auto pt-9 pb-12 px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
} 