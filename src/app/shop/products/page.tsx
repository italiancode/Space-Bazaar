"use client";


import ProductCard from "@/components/shop/ProductCard";
import productsData from "@/products.json";


interface Product {
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
}

export default function ProductsPage() {
  return (
    <div className="py-24 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 