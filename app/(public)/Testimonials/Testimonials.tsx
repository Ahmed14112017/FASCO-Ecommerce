"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "James K.",
    role: "Traveler",
    text: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    image: "/images/image (4).png",
  },
  {
    name: "Sarah W.",
    role: "Designer",
    text: "I was looking for this for so long. Thank you for making it so easy and most of all hassle free. It's great.",
    image: "/images/image (5).png",
  },
  {
    name: "Ahmed M.",
    role: "accountant",
    text: "Fantastic experience from start to finish. The quality exceeded my expectations completely.",
    image: "/images/image (6).png",
  },
];

export default function TestimonialsSection({
  className,
}: {
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const prevIndex = (current - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (current + 1) % testimonials.length;

  return (
    <section className={`bg-gray-50 py-16 px-10 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-light font-serif mb-3">
          This Is What Our Customers Say
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis
        </p>
      </div>

      <div className="flex items-center gap-5 max-w-2xl mx-auto">
        {/* Left ghost */}
        <div className="w-20 shrink-0 opacity-40">
          <div className="w-20 h-24 rounded-md bg-gray-200 overflow-hidden relative">
            <Image
              src={testimonials[prevIndex].image}
              alt={testimonials[prevIndex].name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Main card */}
        <div className="flex-1 bg-white border border-gray-100 rounded-xl p-7 flex gap-5 items-start shadow-sm">
          <div className="w-24 h-28 rounded-md bg-gray-200 shrink-0 overflow-hidden relative">
            <Image
              src={testimonials[current].image}
              alt={testimonials[current].name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 leading-relaxed italic mb-3">
              "{testimonials[current].text}"
            </p>
            <div className="text-yellow-400 text-base tracking-widest mb-3">
              ★★★★★
            </div>
            <hr className="border-gray-100 mb-3" />
            <p className="text-sm font-medium text-gray-900">
              {testimonials[current].name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {testimonials[current].role}
            </p>
          </div>
        </div>

        {/* Right ghost */}
        <div className="w-20 shrink-0 opacity-40">
          <div className="w-20 h-24 rounded-md bg-gray-200 overflow-hidden relative">
            <Image
              src={testimonials[nextIndex].image}
              alt={testimonials[nextIndex].name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mt-7">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={next}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}
