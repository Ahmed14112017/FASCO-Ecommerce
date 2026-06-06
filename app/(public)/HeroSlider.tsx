"use client";
import { useState } from "react";
import Image from "next/image";
import { Gem, ShieldCheck, Truck, Headphones } from "lucide-react";

const slides = [
  {
    id: 1,
    collection: "Women Collection",
    title: "Peaky Blinders",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    price: "$100.00",
    image: "/images/hero-women.jpg",
  },
  {
    id: 2,
    collection: "Men Collection",
    title: "Urban Style",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    price: "$120.00",
    image: "/images/hero-1.jpg",
  },
  {
    id: 3,
    collection: "New Arrivals",
    title: "Classic Fit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    price: "$90.00",
    image: "/images/hero-classic.jpg",
  },
];

const features = [
  { icon: Gem, label: "High Quality", sub: "Crafted from top materials" },
  { icon: ShieldCheck, label: "Warranty Protection", sub: "Over 2 years" },
  { icon: Truck, label: "Free Shipping", sub: "Order over $150" },
  { icon: Headphones, label: "24/7 Support", sub: "Dedicated support" },
];

export default function HeroSlider({ className }: { className?: string }) {
  const [current, setCurrent] = useState(0);

  return (
    <section className={`bg-[#F5F5F5] ${className}`}>
      {/* Slider */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-72 md:h-170">
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {slides[current].collection}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            {slides[current].description}
          </p>
          <p className="text-xl font-semibold">{slides[current].price}</p>
          <button className="w-fit bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors">
            Buy Now
          </button>

          {/* Dots */}
          <div className="flex gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === current ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <f.icon size={24} className="text-gray-700 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{f.label}</p>
                <p className="text-xs text-gray-400">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
