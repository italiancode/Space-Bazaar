"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
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
