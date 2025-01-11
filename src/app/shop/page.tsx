import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="py-24 px-4 text-center">
      <h1 className="text-4xl font-bold">Welcome to the Shop</h1>
      <p className="mt-4">Explore our products!</p>
      <Link
        href="/shop/products" 
        className="mt-4 inline-block bg-accent-blue text-white rounded-full px-4 py-2 cursor-pointer hover:bg-accent-blue/90"
      >
        View Products
      </Link>
    </div>
  );
} 