import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const categories = [
  {
    name: "Apparel",
    image: "/images/categories/apparel.webp",
    itemCount: 42,
  },
  {
    name: "Collectibles",
    image: "/images/categories/collectibles.webp",
    itemCount: 28,
  },
  {
    name: "Accessories",
    image: "/images/categories/accessories.webp",
    itemCount: 35,
  },
];

export default function FeaturedCategories() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <section className="relative py-14 px-4">
      {/* Top fade & glow effect - blending with hero */}
      <div className="absolute inset-x-0 top-0 h-40 z-0">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#1c3a70] via-background/10 to-transparent" />

        <div className="absolute inset-x-0 top-0 h-auto bg-gradient-to-b from-[#4F46E5]to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-[#4F46E5] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Featured Categories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-xl aspect-square bg-[#0a1128] border border-[#4F46E5]/20 hover:border-[#4F46E5]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-1"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/80 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-[#4F46E5]/5 group-hover:bg-[#4F46E5]/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-[#4F46E5] bg-clip-text text-transparent">
                  {category.name}
                </h3>
                <p className="text-[#4F46E5] font-medium">
                  {category.itemCount} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
