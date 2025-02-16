"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleX, Search } from "lucide-react";
import ProductCard from "./shop/ProductCard";
import productsData from "@/products.json"; // Import products data

// Define the product interface
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
  featured: boolean;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Reset search when overlay is closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);

  // Debounce search input
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    const debounceTimer = setTimeout(() => {
      const normalizedSearchQuery = searchQuery.replace(/\s+/g, "").toLowerCase();
      const results = productsData.filter((product) => {
        const normalizedProductName = product.name.replace(/\s+/g, "").toLowerCase();
        return normalizedProductName.includes(normalizedSearchQuery);
      });
      setSearchResults(results);
      setIsLoading(false);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Close overlay on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-space-dark/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-space-dark rounded-lg w-full max-w-3xl shadow-lg overflow-hidden border border-space-mid h-screen"
          >
            {/* Search Header */}
            <div className="flex items-center justify-between p-4 border-b border-space-mid">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-space-light" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-space-light placeholder-space-light/50 focus:outline-none"
                  autoFocus
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close search"
                className="p-2 text-space-light hover:text-accent-blue transition-colors"
              >
                <CircleX className="w-6 h-6" />
              </button>
            </div>

            {/* Search Results */}
            <div className="p-4 pb-36 h-full overflow-y-auto scrollbar-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="w-8 h-8 border-2 border-space-light rounded-full animate-spin border-t-transparent" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : searchQuery.trim() !== "" ? (
                <p className="text-center text-space-light/70">
                  No results found for &quot;{searchQuery}&quot;.
                </p>
              ) : (
                <p className="text-center text-space-light/70">
                  Start typing to search for products.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}