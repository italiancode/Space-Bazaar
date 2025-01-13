import Image from 'next/image';

export default function Categories() {
  return (
    <div>
      <Image
        src="/images/categories/apparel.webp"
        alt="Apparel"
        width={2048}
        height={1024}
        priority
      />
      {/* ... other content ... */}
    </div>
  );
} 