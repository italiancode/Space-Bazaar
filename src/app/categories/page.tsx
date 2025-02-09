"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StarryBackground from "@/components/effects/StarryBackground";

const categories = [
  {
    id: 1,
    name: "Apparel",
    description: "SpaceX branded clothing and accessories",
    image: "/images/categories/apparel.webp",
    count: 42,
    slug: "apparel"
  },
  {
    id: 2,
    name: "Collectibles",
    description: "Limited edition mission patches and memorabilia",
    image: "/images/categories/collectibles.webp",
    count: 28,
    slug: "collectibles"
  },
  {
    id: 3,
    name: "Models",
    description: "Scale models of rockets and spacecraft",
    image: "/images/categories/models.webp",
    count: 15,
    slug: "models"
  },
  {
    id: 4,
    name: "Mission Gear",
    description: "Equipment and gear from specific missions",
    image: "/images/categories/mission-gear.webp",
    count: 23,
    slug: "mission-gear"
  }
];

export default function Categories() {
  return (
    <div className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <StarryBackground className="z-0" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent mb-6">
            Product Categories
          </h1>
          <p className="text-xl text-gray-400">
            Explore our collection of authentic SpaceX merchandise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/shop/categories/${category.slug}`}>
                <div className="group relative h-80 overflow-hidden rounded-xl bg-gray-800/50 
                  border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <div className="absolute bottom-0 p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h2>
                      <p className="text-gray-300 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-indigo-400">
                          {category.count} Products
                        </span>
                        <span className="text-sm text-white opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300">
                          View Collection →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 