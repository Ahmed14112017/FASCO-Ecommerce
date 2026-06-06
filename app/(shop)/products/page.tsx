"use client";
import { useState } from "react";
import FilterProduct, {
  Filters,
} from "@/app/(shop)/products/components/FilterProduct";
import ProductsList from "@/app/(shop)/products/components/ProductsList";

const defaultFilters: Filters = {
  sizes: [],
  colors: [],
  category: "All",
  minPrice: 0,
  maxPrice: 1000,
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Mobile filter toggle */}
      <button
        className="md:hidden mb-4 px-4 py-2 border border-gray-300 rounded-lg text-sm"
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex gap-8">
        <div className={`${showFilter ? "block" : "hidden"} md:block`}>
          <FilterProduct onFilterChange={setFilters} />
        </div>
        <ProductsList filters={filters} />
      </div>
    </div>
  );
}
