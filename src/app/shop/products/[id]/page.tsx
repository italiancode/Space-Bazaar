"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCart from "@/components/shop/AddToCart";

import productsData from "@/products.json"; // Import the JSON data

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



export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const product = productsData.find((item) => item.id === productId);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="py-24 px-4 text-center">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <Image src={product.image} alt={product.name} width={500} height={500} className="object-cover" />
      <p className="text-xl text-accent-blue">${product.price.toFixed(2)}</p>
      <p className="mt-4">{product.description}</p>

      <AddToCart productId={product.id} />
    </div>
  );
} 