"use client";

import FeaturedCategories from "@/components/FeaturedCategories";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <HeroBanner />
      <FeaturedCategories />
    </div>
  );
}
