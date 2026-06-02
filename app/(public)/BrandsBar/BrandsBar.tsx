"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrandsBar() {
  const brands = [
    { name: "Calvin", logo: "/images/brands/calvin.png" },
    { name: "Chanel", logo: "/images/brands/chanel.png" },
    { name: "DENIM", logo: "/images/brands/denim.png" },
    { name: "Louis Vuitton", logo: "/images/brands/louis.png" },
    { name: "PRADA", logo: "/images/brands/prada.png" },
  ];

  return (
    <div className="flex items-center justify-between p-4 gap-4 overflow-x-auto container  mx-auto px-4 py-8">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex items-center justify-center w-32 h-16 bg-gray-100 "
        >
          <Image
            src={brand.logo}
            alt={brand.name}
            className="object-contain"
            width={150}
            height={150}
          />
        </div>
      ))}
    </div>
  );
}
