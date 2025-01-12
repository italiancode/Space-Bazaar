"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navItems = ["Shop", "Categories", "About", "Contact"];
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 max-w-7xl mx-auto w-full z-50">
      <div className=" flex flex-row">
        <div className="absolute inset-0 bg-space-dark backdrop-blur-md h-2/3" />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-lg" />
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          <Link href="/" className="flex items-center space-x-2">
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
            <span className="text-lg sm:text-xl lg:text-2xl font-bold whitespace-nowrap">
              Space Bazaar
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm lg:text-base hover:text-accent-blue transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4 gap-1">
            <button className="p-1 sm:p-2 hover:text-accent-blue transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/shop/cart"
              className="relative p-1 sm:p-2 hover:text-accent-blue transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="p-1 sm:p-2 hover:text-accent-blue transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              className="md:hidden p-1 sm:p-2 hover:text-accent-blue transition-colors"
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative md:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
            <nav className="relative flex flex-col px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-base sm:text-lg hover:text-accent-blue transition-colors group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
