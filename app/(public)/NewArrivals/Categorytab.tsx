"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetGategory } from "@/features/categories/services/categories";
import { getCatergoryProps } from "@/features/categories/types/catergory";
import Button from "../../components/ui/Button";

export default function CategoryTabs({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) {
  const [active, setActive] = useState("");
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: GetGategory,
  });
  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
  };

  return (
    <div className="flex gap-2 border-b  border-gray-500 justify-center items-center py-4">
      {categories &&
        categories.map((cat: getCatergoryProps) => (
          <Button
            variant="secondary"
            key={cat._id}
            onClick={() => handleSelect(cat._id)}
            className={`px-4 py-2 text-sm transition-colors ${
              active === cat._id
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {cat.name}
          </Button>
        ))}
      <Button
        onClick={() => handleSelect("")}
        variant="secondary"
        className="px-4 py-2 text-sm transition-colors text-gray-500 hover:text-black"
      >
        View All
      </Button>
    </div>
  );
}
