import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png" // You'll need to add this
              alt="Space Bazaar"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">Space Bazaar</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-sm hover:text-accent-blue transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-sm hover:text-accent-blue transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-sm hover:text-accent-blue transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-accent-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-accent-blue transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 hover:text-accent-blue transition-colors">
              <CartIcon className="w-5 h-5" />
            </Link>
            <Link href="/account" className="p-2 hover:text-accent-blue transition-colors">
              <UserIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Simple icon components
const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
); 