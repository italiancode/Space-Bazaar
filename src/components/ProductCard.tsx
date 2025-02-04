import Image from "next/image";

import AddToCart from "./shop/AddToCart";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 z-10" />
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-indigo-500/50 z-20">
          <span className="text-indigo-300 font-mono font-semibold whitespace-nowrap">${price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-base sm:text-lg font-semibold text-white truncate whitespace-nowrap">
          {name}
        </h3>
        <p className="text-gray-300 mt-2 text-xs sm:text-sm line-clamp-2 min-h-[40px]">
          {description}
        </p>
        <div className="mt-4">
          <AddToCart productId={id} />
        </div>
      </div>
    </div>
  );
}
