import ProductCard from "@/components/shop/ProductCard";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import products from "@/data/products.json";
import { ProductInterface } from "@/types/ProductInterface";

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

export default function FeaturedProducts() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-16 whitespace-nowrap bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
          Featured SpaceX Merch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={index} className="h-fit">
              <ProductCard key={index} product={product as ProductInterface} />
            </div>
          ))}
        </div>  
      </div>
    </section>
  );
}
