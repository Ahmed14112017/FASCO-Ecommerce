"use client";
import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Gray", hex: "#808080" },
];

const categories = [
  "All",
  "Dresses",
  "Tops",
  "Pants",
  "Jackets",
  "Shoes",
  "Accessories",
];

export interface Filters {
  sizes: string[];
  colors: string[];
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface FilterProductProps {
  onFilterChange: (filters: Filters) => void;
}

export default function FilterProduct({ onFilterChange }: FilterProductProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  function toggleSize(size: string) {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updated);
    onFilterChange({
      sizes: updated,
      colors: selectedColors,
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  }

  function toggleColor(color: string) {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updated);
    onFilterChange({
      sizes: selectedSizes,
      colors: updated,
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  }

  function handleCategory(cat: string) {
    setSelectedCategory(cat);
    onFilterChange({
      sizes: selectedSizes,
      colors: selectedColors,
      category: cat,
      minPrice,
      maxPrice,
    });
  }

  function handlePrice(max: number) {
    setMaxPrice(max);
    onFilterChange({
      sizes: selectedSizes,
      colors: selectedColors,
      category: selectedCategory,
      minPrice,
      maxPrice: max,
    });
  }

  return (
    <aside className="w-56 shrink-0 flex flex-col gap-6">
      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
          Category
        </h3>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleCategory(cat)}
                className={`text-sm w-full text-left px-2 py-1 rounded transition-colors ${
                  selectedCategory === cat
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
          Colors
        </h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              title={color.name}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColors.includes(color.name)
                  ? "border-black scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
          Price
        </h3>
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          onChange={(e) => handlePrice(Number(e.target.value))}
          className="w-full accent-black"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 text-xs border rounded transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
