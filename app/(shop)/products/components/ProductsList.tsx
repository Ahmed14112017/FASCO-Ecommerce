"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filters } from "./FilterProduct";
import ProductGrid from "./ProductGrid";
import { Productprops } from "@/features/products/types/products";
import { getFilteredProducts } from "@/features/products/services/products";

interface ProductsListProps {
  filters: Filters;
}

export default function ProductsList({ filters }: ProductsListProps) {
  const [products, setProducts] = useState<Productprops[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getFilteredProducts({
          category: filters.category,
          colors: filters.colors,
          sizes: filters.sizes,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search,
        });
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters, search]);

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">
          {search ? `Results for "${search}"` : "Fashion"}
        </h2>
        <p className="text-sm text-gray-400">{total} results</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-60 text-gray-400 text-sm">
          Loading...
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <div className="flex items-center justify-center h-60 text-gray-400 text-sm">
          No products found
        </div>
      )}

      {/* Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductGrid key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
