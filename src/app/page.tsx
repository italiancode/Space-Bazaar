"use client";

import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <div className="">
      <HeroBanner />
      <FeaturedProducts />
      {/* <FeaturedCategories /> */}
    </div>
  );
}
