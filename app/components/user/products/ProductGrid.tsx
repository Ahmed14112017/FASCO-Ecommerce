import { Productprops } from "@/app/(admin)/admin-products/types/products";
import Image from "next/image";

export default function ProductGrid({ product }: { product: Productprops }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
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
        {/* Name */}
        <h3 className="text-sm font-medium text-gray-800 truncate">
          {product.name}
        </h3>

        {/* Rating */}
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

        {/* Category */}
        <p className="text-xs text-gray-400">{product.category?.name}</p>

        {/* Price */}
        <p className="text-sm font-semibold mt-1">${product.price}</p>
      </div>
    </div>
  );
}
