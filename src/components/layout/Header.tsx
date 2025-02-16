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
    <header className="fixed top-0 left-0 right-0 z-50">
      <svg className="hidden">
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      <div className="max-w-7xl mx-auto">
        {/* Background layers */}
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 header-glass" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-header-border/20 to-transparent" />
          <div className="absolute inset-0 header-glow" />
        </div>

        <div className="backdrop-blur-md bg-transparent border-b border-white/10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <Link
                href="/"
                className="flex items-center space-x-2 transition-opacity hover:opacity-80 group"
              >
                <div className="relative animate-slow-pulse">
                  {!logoError ? (
                    <Image
                      src="/logo.png"
                      alt="Space Bazaar"
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full z-10 relative"
                      onError={() => setLogoError(true)}
                      priority
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center z-10 relative">
                      <span className="text-white font-bold text-sm sm:text-base">
                        SB
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-blue-500 rounded-full filter blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                    style={{ filter: "url(#glow)" }}
                  ></div>
                </div>

                <span className="inline text-md sm:text-xl font-bold text-white relative">
                  Space Bazaar
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"
                    style={{ filter: "url(#glow)" }}
                  ></span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <IconWrapper onClick={() => setIsSearchOverlayOpen(true)}>
                  <Search className="w-5 h-5 text-white" />
                </IconWrapper>

                <IconWrapper href="/shop/cart">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: isCartBadgeAnimating ? [1, 1.2, 1] : 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: isCartBadgeAnimating ? 2 : 0.3,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-1 -right-1 
                        bg-white text-black text-xs font-bold
                        min-w-[18px] h-[18px]
                        rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </IconWrapper>

                <IconWrapper href="/account">
                  <User className="w-5 h-5 text-white" />
                </IconWrapper>

                <IconWrapper onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-white" />
                  )}
                </IconWrapper>
              </div>
            </div>
          </div>
        </div>

        <SearchOverlay
          isOpen={isSearchOverlayOpen}
          onClose={() => setIsSearchOverlayOpen(false)}
        />

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden backdrop-blur-md bg-black/30 border-b border-white/10"
            >
              <nav className="flex flex-col px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="text-base text-white/90 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
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
