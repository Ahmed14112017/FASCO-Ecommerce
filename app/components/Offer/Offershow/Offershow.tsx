"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
export default function Offershow() {
  const offersshow = [
    { name: "Offer 1", image: "/images/offer-1.jpg" },
    { name: "Offer 2", image: "/images/offer-2.jpg" },
    { name: "Offer 3", image: "/images/offer-3.jpg" },
    { name: "Offer 4", image: "/images/offer-4.jpg" },
    { name: "Offer 5", image: "/images/offer-5.jpg" },
    { name: "Offer 6", image: "/images/offer-6.jpg" },
  ];
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {offersshow.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-75 rounded-lg overflow-hidden">
              <Image
                src={offer.image}
                alt={offer.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
