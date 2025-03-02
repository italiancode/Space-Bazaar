"use client";

import ProductCard from "@/components/shop/ProductCard";

import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import products from "@/data/products.json";
import { ProductInterface } from "@/types/ProductInterface";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Replace the hardcoded featuredProducts with filtered products from json
const featuredProducts = products
  .filter((product) => product.featured)
  .map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    stock: product.stock,
    ratings: product.ratings,
    reviews: product.reviews,
    sku: product.sku,
  }));

const FeaturedProducts = () => {
  const controls = useAnimation();
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch your products here
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching products:", error);
        setLoading(false); // Also set loading to false on error
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-14 px-4 overflow-hidden">
      {/* Top fade & glow effect - blending with hero */}
      <div className="absolute inset-x-0 top-0 h-40 z-0">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#4F46E5] via-background/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent text-white flex items-center z-20">
            {/* <TrendingUp className="mr-4 h-10 w-10 text-yellow-400 animate-pulse" /> */}
            Featured SpaceX Merch
          </h2>
          <Link href="/shop/collections" passHref>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex whitespace-nowrap font-semibold text-lg border border-white px-6 py-3
               text-white
              transition-all duration-300 hover:bg-white hover:text-black"
            >
              View All
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="relative ">
          {!loading && (
            <>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-full pl-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => scroll("left")}
                  className="hidden md:flex rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800/50 hover:bg-gray-800/70"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-full pr-4">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => scroll("right")}
                  className="hidden md:flex rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800/50 hover:bg-gray-800/70"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </>
          )}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 sm:px-6 lg:px-8 scrollbar-hide scroll-smooth"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-none w-72 h-96 bg-gray-700 rounded-lg animate-pulse"
                />
              ))
            ) : // Render featured products
            featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 10).map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-72 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 mt-8"
                >
                  <ProductCard product={product as ProductInterface} />
                </div>
              ))
            ) : (
              <div className="text-center w-full py-8 text-white">
                No trending products available.
              </div>
            )}

            <div className="flex-none w-48 flex items-center justify-center">
              <Link href="/shop/collections" passHref>
                <Button
                  variant="default"
                  size="sm"
                  className="whitespace-nowrap font-semibold text-lg bg border border-white px-6 py-3
               text-white
              transition-all duration-300 bg-gray-800/50 hover:bg-gray-800/70"
                >
                  View More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop/collections" passHref>
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap font-semibold text-lg border border-white px-6 py-3
               text-white
              transition-all duration-300 hover:bg-white hover:text-black"
            >
              View All Collections
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
