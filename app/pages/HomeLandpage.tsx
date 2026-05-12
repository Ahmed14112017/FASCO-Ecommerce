"use client";
import Image from "next/image";
import Button from "../components/ui/Button";
import { useRouter } from "next/navigation";

export default function HomeLandpage() {
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:px-4 pt-6 ">
      <div className="relative w-full aspect-3/4  rounded-lg bg-[#E0E0E0] min-h-162.5 overflow-hidden">
        <Image
          src={"/images/home-1.png"}
          alt="home-1"
          className="object-cover  "
          fill
        />
      </div>
      <div className="flex flex-col justify-between items-center  w-full h-full ">
        <div className="relative  h-35  w-full">
          <Image
            src={"/images/group.png"}
            alt="group"
            fill
            className=" mx-auto object-cove"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center w-full  ">
          <div className="w-full text-center">
            <h1 className="text-[30px] md:text-[50px] lg:text-[60px] leading-none font-semibold">
              ULTIMATE
            </h1>

            <h2
              className="text-[30px] md:text-[50px] lg:text-[60px] leading-none font-semibold"
              style={{
                WebkitTextStroke: "2px black",
                color: "transparent",
              }}
            >
              SALE
            </h2>
          </div>
          <span className="text-xl md:text-lg py-4">NEW COLLECTION</span>
        </div>
        <Button
          onClick={() => router.push("/products")}
          variant="primary"
          className="rounded-md py-3 px-8 w-full sm:w-auto cursor-pointer"
        >
          SHOP NOW
        </Button>
        <div className="relative  w-full pt-4">
          <Image
            src={"/images/image.png"}
            alt="group"
            width={500}
            height={200}
            className=" mx-auto object-cove"
          />
        </div>
      </div>
      <div className="lg:block hidden relative w-full aspect-3/4 overflow-hidden rounded-lg bg-[#E0E0E0]  min-h-162.5 ">
        <Image
          src={"/images/home-4.jpg"}
          alt="home-4"
          className="object-cover"
          fill
        />
      </div>
    </section>
  );
}
