// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-semibold text-gray-900">404</h1>
      <p className="text-gray-400">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:opacity-80 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
