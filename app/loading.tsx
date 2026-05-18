export default function Loading() {
  return (
    <section className="py-2 px-3">
      <div className="flex justify-between items-center py-6">
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded-md" />

        <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-md bg-gray-200 animate-pulse h-16"
          />
        ))}
      </div>
    </section>
  );
}
