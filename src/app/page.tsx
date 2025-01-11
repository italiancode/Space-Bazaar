import Image from "next/image";
import HeroEvents from '@/components/HeroEvents';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroEvents />

      {/* Featured Categories */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-300">{category.itemCount} items</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const categories = [
  {
    name: "Apparel",
    image: "/categories/apparel.jpg", // You'll need to add these images
    itemCount: 42,
  },
  {
    name: "Collectibles",
    image: "/categories/collectibles.jpg",
    itemCount: 28,
  },
  {
    name: "Accessories",
    image: "/categories/accessories.jpg",
    itemCount: 35,
  },
];
