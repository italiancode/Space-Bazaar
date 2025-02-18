"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BannerStars } from "./effects/BannerStars";

export default function HeroBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[45vh] max-h-[800px] min-h-[320px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] to-[#4F46E5] z-0">
        <BannerStars />
      </div>
      <div className="relative h-full z-10">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div
            className={`text-center max-w-2xl mx-auto transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
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
                transition-all duration-300 hover:bg-white hover:text-black rounded-full"
              >
                <span className="mr-2">Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-0" />
    </section>
  );
}
