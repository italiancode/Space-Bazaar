"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import SearchOverlay from "@/components/SearchOverlay";

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

  useEffect(() => {
    if (cartCount > 0) {
      setIsCartBadgeAnimating(true);
      const timer = setTimeout(() => setIsCartBadgeAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const IconWrapper = ({
    children,
    href,
    onClick = () => {},
  }: {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
  }) => {
    const Component = href ? Link : "button";
    return (
      <Component
        {...(href ? { href } : ({} as any))}
        onClick={onClick}
        className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 
                   shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)]
                   focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        {children}
      </Component>
    );
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-header-bg backdrop-blur-md border-b border-header-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Space Bazaar"
                width={50}
                height={50}
                className="w-10 h-10 rounded-full shadow-lg transition-transform transform hover:scale-105"
                onError={() => setLogoError(true)}
                priority
              />
              <div className="absolute inset-0 rounded-full border-2 border-accent-blue opacity-50" />
            </div>
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent font-bold text-lg">Space Bazaar</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-sm text-foreground hover:text-accent-blue transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <IconWrapper onClick={() => setIsSearchOverlayOpen(true)}>
              <Search className="w-5 h-5 text-foreground" />
            </IconWrapper>

            <IconWrapper href="/shop/cart">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </IconWrapper>

            <IconWrapper href="/account">
              <User className="w-5 h-5 text-foreground" />
            </IconWrapper>

            <div className="md:hidden flex items-center">
              <IconWrapper onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
              </IconWrapper>
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
      />

      {isMenuOpen && (
        <div className="md:hidden bg-header-bg border-t border-header-border">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-base text-foreground hover:text-accent-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
