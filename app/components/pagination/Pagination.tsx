"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  total: number;
  currentPage: number;
  limit?: number;
}
export default function Pagination({
  total,
  currentPage,
  limit = 5,
}: PaginationProps) {
  const router = useRouter();
  const totalPages = Math.ceil(total / limit);
  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {/* Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-4 py-2 rounded-md border transition-colors cursor-pointer ${
            page === currentPage
              ? "bg-black text-white border-black"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}
