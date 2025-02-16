"use client"

import { motion } from "framer-motion"
import { StarryBackground } from "./effects/StarryBackground"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function HeroBanner() {
  const [showDescription, setShowDescription] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowDescription(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="h-screen relative bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <StarryBackground />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-20 max-w-2xl mx-auto"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-8">Space Bazaar</h1>

          {showDescription && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-300 mb-12"
            >
              Authentic space collectibles and gear
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

