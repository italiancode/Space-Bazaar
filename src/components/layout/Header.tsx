"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import SearchOverlay from "@/components/SearchOverlay"; // Import the new SearchOverlay component

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const navItems = [
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/shop/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const [isCartBadgeAnimating, setIsCartBadgeAnimating] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Add effect to handle cart changes
  useEffect(() => {
    if (cartCount > 0) {
      setIsCartBadgeAnimating(true);
      const timer = setTimeout(() => setIsCartBadgeAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto relative">
        {/* Background layers */}
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 header-glass" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-header-border/20 to-transparent" />
          <div className="absolute inset-0 header-glow" />
        </div>

        {/* Content */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo section */}
            <Link href="/" className="flex items-center space-x-2 header-hover">
              {!logoError ? (
                <Image
                  src="/logo.png"
                  alt="Space Bazaar"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-accent-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
                    SB
                  </span>
                </div>
              )}
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Space Bazaar
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="header-hover text-sm lg:text-base text-white/90 hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOverlayOpen(true)}
                className="p-1 sm:p-2 header-hover text-white/90"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/shop/cart"
                className="relative p-1 sm:p-2 header-hover text-white/90 group"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: isCartBadgeAnimating ? [1, 1.2, 1] : 1,
                      opacity: 1,
                      background: isCartBadgeAnimating
                        ? [
                            "linear-gradient(to right, #ef4444, #7c3aed)",
                            "linear-gradient(to right, #7c3aed, #ef4444)",
                            "linear-gradient(to right, #ef4444, #7c3aed)",
                          ]
                        : "linear-gradient(to right, #ef4444, #7c3aed)",
                    }}
                    transition={{
                      duration: isCartBadgeAnimating ? 2 : 0.3,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-2 -right-2 
                      text-white text-xs font-bold
                      min-w-[20px] h-[20px]
                      rounded-full flex items-center justify-center
                      shadow-[0_0_10px_rgba(239,68,68,0.5)]
                      border-2 border-white/20
                      group-hover:scale-110 
                      backdrop-blur-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
              <Link
                href="/account"
                className="p-1 sm:p-2 header-hover text-white/90"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                className="md:hidden p-1 sm:p-2 header-hover text-white/90"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOverlayOpen}
          onClose={() => setIsSearchOverlayOpen(false)}
        />

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="relative md:hidden"
            >
              <div className="absolute inset-0 header-glass" />
              <nav className="relative flex flex-col px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-base sm:text-lg header-hover text-white/90 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-header-hover transition-all group-hover:w-full" />
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
