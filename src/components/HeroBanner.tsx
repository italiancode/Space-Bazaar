"use client";

import { motion, useAnimation } from "framer-motion";
import { StarryBackground } from "./effects/StarryBackground";
import { ShoppingCart, Store } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroBanner() {
  const [showDescription, setShowDescription] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setShowDescription(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls]);

  return (
    <section className="h-[50vh] md:h-[60vh] max-h-[800px] overflow-hidden relative bg-gradient-to-b from-[#0a1128] to-[#1c3a70] z-10">
      <div className="absolute inset-0 z-10">
        <StarryBackground />
      </div>

      <div className="absolute inset-0 flex flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-center z-20 max-w-4xl lg:w-1/2 mx-auto my-auto">
          <motion.div
            className="flex flex-col items-center justify-center space-y-2"
            initial={{ opacity: 0, y: -50 }}
            animate={controls}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent px-4">
              <span className="inline-block whitespace-nowrap">Explore the Universe</span>
              <br className="hidden sm:block" />
              <span className="inline-block whitespace-nowrap">of SpaceX Collectibles</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 mt-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showDescription ? 1 : 0,
              y: showDescription ? 0 : 20,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            An online marketplace where users can buy and sell SpaceX merchandise, 
            with a portion of the profits going towards funding future space exploration missions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Link
              href="/shop"
              className={cn(
                "bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90",
                "w-full sm:w-auto",
                "px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4",
                "text-sm sm:text-base lg:text-lg font-semibold",
                "rounded-full shadow-md hover:shadow-xl transition-all duration-300",
                "flex items-center justify-center gap-2",
                "hover:scale-105 transform transition-transform"
              )}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              <span className="whitespace-nowrap">Start Shopping</span>
            </Link>

            <Link
              href="/about"
              className={cn(
                "border border-white text-white hover:bg-white hover:text-[var(--accent-blue)]",
                "w-full sm:w-auto",
                "px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-4",
                "text-sm sm:text-base lg:text-lg font-semibold",
                "rounded-full shadow-md hover:shadow-lg transition-all duration-300",
                "flex items-center justify-center gap-2",
                "hover:scale-105 transform transition-transform"
              )}
            >
              <Store className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              <span className="whitespace-nowrap">{"I'm a Seller"}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Subtle Sound Effects */}
      {/* <audio autoPlay loop>
        <source src="/space-ambience.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
    </section>
  );
}
