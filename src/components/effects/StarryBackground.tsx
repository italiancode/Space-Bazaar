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
    return Array.from({ length: 50 }) // Reduce from default number to 50 stars
      .map(() => ({
        left: `${random() * 100}%`,
        top: `${random() * 100}%`,
        size: `${random() * 2 + 1}px`,
        duration: random() * 3 + 2,
        delay: random() * 2,
      }));
  }, []);

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            willChange: "transform, opacity" // Add will-change for better performance
          }}
        />
      ))}
    </div>
  );
}

export default StarryBackground;

