"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/shop/AddToCart";
import { Star } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  ratings: number;
  reviews: number;
  sku: string;
  dimensions: string;
  weight: string;
  rating?: number; // Make it optional
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-space-gray rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="object-cover"
      />
      <div className="p-2">
        <h2 className="text-sm font-semibold text-foreground">
          {product.name}
        </h2>
        <p className="text-lg text-accent-blue">${product.price.toFixed(2)}</p>
        <div className="flex items-center mb-1">
          <div className="flex space-x-1 text-yellow-400">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < product.ratings ? "fill-current" : "fill-gray-500"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-400 ml-1 text-xs">
            ({product.ratings} ratings)
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={`/shop/products/${product.id}`}
            className="inline-block bg-accent-blue text-white rounded px-2 py-1 text-xs hover:bg-accent-blue/90"
          >
            View Details
          </Link>
          <AddToCart productId={product.id} />
        </div>
      </div>
    </div>
  );
}
