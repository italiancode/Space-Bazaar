"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Star,
  Heart,
  MessageCircle,
  Plus,
  Minus,
  ChevronDown,
} from "lucide-react";
import AddToCart from "./AddToCart";
import {
  doc,
  updateDoc,
  getDoc,
  increment,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { initializeProduct } from "@/lib/initializeProducts";
import type React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { handleLikeProduct } from "@/utils/productActions";
import { ProductInterface } from "@/types/ProductInterface";

interface ProductCardProps {
  product: ProductInterface;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        await initializeProduct(product.id);
        let hasLiked = false;

        // Get total likes count
        const productRef = doc(db, "products", product.id.toString());
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          const totalLikes = productDoc.data().likes || 0;
          setLikes(totalLikes);
        }

        // If user is logged in, ONLY check Firebase likes
        if (currentUser) {
          const userLikeRef = doc(
            db,
            `products/${product.id}/likes/${currentUser.uid}`
          );
          const userLikeDoc = await getDoc(userLikeRef);
          hasLiked = userLikeDoc.exists();
        } else {
          // Only check localStorage if user is not authenticated
          const guestLikes = JSON.parse(
            localStorage.getItem("guestLikes") || "{}"
          );
          hasLiked = !!guestLikes[product.id];
        }

        setLiked(hasLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    checkLikeStatus();
  }, [product.id, currentUser, product.name]);

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
      } catch (error) {
        console.error("Error fetching user IP:", error);
      }
    };

    fetchUserIp();
  }, []);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userIp) {
      await handleLikeProduct(product.id, currentUser, liked, setLiked, setLikes, userIp);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const stockStatus = () => {
    if (product.stock > 50) return "In Stock";
    if (product.stock > 0) return `Only ${product.stock} left`;
    return "Out of Stock";
  };

  const stockColor = () => {
    if (product.stock > 50) return "text-green-400";
    if (product.stock > 0) return "text-yellow-400";
    return "text-red-400";
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest("button") &&
      !target.closest("a") &&
      !target.closest("input")
    ) {
      setShowDetails(!showDetails);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 
        rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 
        backdrop-blur-sm transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 z-10" />
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div
          className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 
          rounded-full border border-indigo-500/50 z-20"
        >
          <span className="text-indigo-300 font-mono font-semibold whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Link
          href={`/shop/products/${product.id}`}
          className={`absolute bottom-3 left-3 right-3 bg-indigo-500/90 hover:bg-indigo-600/90 
            text-white text-center py-2 rounded-lg backdrop-blur-sm transition-all duration-300 z-20
            sm:opacity-0 sm:group-hover:opacity-100
            ${showDetails ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          View Full Details
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1 flex justify-between items-center">
          <h3
            className={`text-sm sm:text-base font-semibold text-white ${
              showDetails ? "" : "truncate"
            }`}
          >
            {product.name}
          </h3>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <span>{showDetails ? "Collapse" : "Expand"}</span>
            <ChevronDown
              className={`ml-1 transform transition-transform ${
                showDetails ? "rotate-180" : ""
              }`}
              size={14}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 mb-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-300">
            {product.ratings} ({product.reviews} reviews)
          </span>
        </div>

        <motion.div
          initial={false}
          animate={{ height: showDetails ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="space-y-2 text-sm text-gray-400 mb-4">
            <p className="line-clamp-3">{product.description}</p>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>SKU: {product.sku}</span>
            </div>
            <p className={`font-medium ${stockColor()}`}>{stockStatus()}</p>
          </div>
        </motion.div>

        <div className="mt-auto pt-4 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-full ${
                liked ? "bg-red-500 text-white" : "bg-gray-700/50 text-gray-300"
              } hover:bg-red-600 transition-colors flex items-center gap-1`}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart size={14} className={liked ? "fill-current" : ""} />
              <span className="text-xs">{likes}</span>
            </button>
            <button
              className="p-1.5 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600 transition-colors flex items-center gap-1"
              aria-label="View comments"
            >
              <MessageCircle size={14} />
              <span className="text-xs">{product.comments || 0}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 w-auto">
            <div className="flex items-center bg-gray-700/50 rounded-full">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="p-1.5 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-full"
              >
                <Minus size={14} />
              </button>
              <span className="text-xs text-white font-mono px-2">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className="p-1.5 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-full"
              >
                <Plus size={14} />
              </button>
            </div>

            <AddToCart
              productId={product.id}
              quantity={quantity}
              disabled={product.stock === 0}
              className="w-fit"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
