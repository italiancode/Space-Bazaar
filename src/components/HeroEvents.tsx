"use client";

import { motion } from "framer-motion";
import { StarryBackground } from "./background-effect/StarryBackground";
import { ProductIcon } from "./ProductIcon";
import { Rocket, Satellite, SpaceIcon as Planet, Atom } from 'lucide-react';
import { Button } from "./ui/button";

export default function HeroEvents() {
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a1128] via-background to-background" />
      <StarryBackground />
      
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <motion.div
          className="absolute top-10 left-10 grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ProductIcon icon={Rocket} delay={1} />
          <ProductIcon icon={Satellite} delay={1.2} />
          <ProductIcon icon={Planet} delay={1.4} />
          <ProductIcon icon={Atom} delay={1.6} />
        </motion.div>

        <div className="text-center px-4 z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Space Bazaar
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your Gateway to Intergalactic Commerce
          </motion.p>
          <motion.div
            className="text-[var(--accent-blue)] text-lg md:text-xl font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Explore the Universe of Trade
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90"
            >
              Start Shopping
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 right-10 text-white text-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <p>🚀 Free shipping on orders over 1000 credits!</p>
        </motion.div>
      </div>
    </div>
  );
}

