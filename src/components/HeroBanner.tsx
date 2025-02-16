"use client";

import { ArrowRight } from "lucide-react";
import {  useEffect } from "react";
import Link from "next/link";
import { BannerStars } from "./effects/BannerStars";

export default function HeroBanner() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="h-[30vh] md:h-[45vh] max-h-[800px] min-h-[320px] relative  overflow-hidden bg-gradient-to-b from-[#0a1128] to-[#1c3a70] z-10">
        <div className="absolute inset-0 opacity-50">
          <BannerStars />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="text-center z-20 max-w-2xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent mb-8">
              Space Bazaar
            </h1>

            <p className="text-lg text-gray-300 mb-12">
              Authentic space collectibles and gear
            </p>

            <div>
              <Link
                href="/shop/collections"
                className="group inline-flex items-center justify-center
              border border-white px-6 py-3
              text-sm font-medium text-white
              transition-all duration-300 hover:bg-white hover:text-black"
              >
                <span className="mr-2">Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
