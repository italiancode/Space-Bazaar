'use client';

import React from 'react';
import { useMemo } from "react";
import { motion } from "framer-motion";

// Create a deterministic random number generator with a fixed seed
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const FIXED_SEED = 123; // Use a constant seed

interface StarryBackgroundProps {
  className?: string; // Add className prop
}

export function StarryBackground({ className }: StarryBackgroundProps) {
  const stars = useMemo(() => {
    const random = mulberry32(FIXED_SEED);
    return Array.from({ length: 100 }, () => ({
      left: `${random() * 100}%`,
      top: `${random() * 100}%`,
      size: random() * 2 + 1,
      duration: random() * 3 + 2,
      delay: random() * 2,
    }));
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className={`starry-background ${className}`}>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}

export default StarryBackground;

