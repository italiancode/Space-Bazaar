"use client"

import Header from "./Header";
import Footer from "./Footer";
// import { StarryBackground } from "../effects/StarryBackground";
import { useEffect, useCallback } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleScroll = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [handleScroll]);

  return (
    <div className="relative min-h-screen flex flex-col max-w-7xl mx-auto">
      {/* <StarryBackground className="z-[0]" /> */}
      <Header />
      <main className="flex-grow pt-16 min-h-[90vh] xl:max-h-[50%] bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
