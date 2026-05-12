"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-semibold text-gray-900">Oops!</h1>
      <p className="text-gray-400">Something went wrong</p>
      <p className="text-sm text-red-400">{error.message}</p>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
