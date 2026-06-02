"use client";

import { Productprops } from "@/features/products/types/products";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/features/wishlist/services/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductGrid({ product }: { product: Productprops }) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function checkWishlist() {
      try {
        const items = await getWishlist();
        setIsWishlisted(items.some((item: any) => item._id === product._id));
      } catch {}
    }
    checkWishlist();
  }, [product._id]);

  async function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id!);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(product._id!);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Error updating wishlist");
    }
  }

  return (
    <div
      onClick={() => router.push(`/products/${product._id}`)}
      className="bg-white rounded-lg overflow-hidden group cursor-pointer relative"
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform"
      >
        <Heart
          size={16}
          className={
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }
        />
      </button>

      {/* Image */}
      <div className="relative w-full h-70 overflow-hidden">
        <Image
          src={product.images?.[0] || "/images/image-not-found.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 my-1">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`text-xs ${
                i < Math.floor(product.rating ?? 0)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400">{product.category?.name}</p>
        <p className="text-sm font-semibold mt-1">${product.price}</p>
      </div>
    </div>
  );
}
