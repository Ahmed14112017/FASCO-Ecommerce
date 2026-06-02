"use client";
import { useEffect, useState } from "react";
import {
  getWishlist,
  removeFromWishlist,
} from "@/features/wishlist/services/wishlist";
import { addToCart } from "@/app/(shop)/cart/cartSlice/cartslice";
import { useAppDispatch } from "@/lib/hooks/Hooks";
import { Productprops } from "@/features/products/types/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const [items, setItems] = useState<Productprops[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const data = await getWishlist();
        setItems(data);
      } catch {
        toast.error("Error fetching wishlist");
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  async function handleRemove(productId: string) {
    try {
      await removeFromWishlist(productId);
      setItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Error removing from wishlist");
    }
  }

  function handleAddToCart(product: Productprops) {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: [product.images?.[0] || "/images/image-not-found.png"],
        quantity: 1,
      }),
    );
    toast.success("Added to cart!");
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Your wishlist is empty</p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg text-sm"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 flex gap-4 items-center"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.images?.[0] || "/images/image-not-found.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price}</p>
                <p className="text-xs text-gray-400">{item.category?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-3 py-1.5 bg-black text-white rounded-lg text-xs hover:opacity-80"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item._id!)}
                  className="px-3 py-1.5 border border-red-200 text-red-400 rounded-lg text-xs hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
