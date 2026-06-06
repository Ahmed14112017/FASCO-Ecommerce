import Image from "next/image";

export default function InstagramSection({
  className,
}: {
  className?: string;
}) {
  const images = [
    {
      images: "/images/image (4).png",

      offset: true,
    },
    {
      images: "/images/image (5).png",

      offset: false,
    },
    {
      images: "/images/image (6).png",

      offset: false,
    },
    {
      images: "/images/image (7).png",

      offset: false,
    },
    {
      images: "/images/image (8).png",

      offset: false,
    },
  ];

  return (
    <section className={`py-16 px-10 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-light font-serif mb-3">
          Follow Us On Instagram
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1.5 relative max-w-5xl mx-auto">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.images}
            width={300}
            height={300}
            alt={`Instagram Image ${i + 1}`}
            className={`aspect-3/4 overflow-hidden ${i % 2 !== 0 ? "mt-6" : ""} objectFit="cover"`}
          />
        ))}
      </div>
    </section>
  );
}
