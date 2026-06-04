"use client";
import { useEffect, useState } from "react";
import {
  getProductReviews,
  addReview,
  deleteReview,
} from "@/features/reviews/services/reviews";
import { toast } from "react-toastify";
import Image from "next/image";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { decodedtoken } from "@/features/auth/types/auth";

interface Review {
  _id: string;
  user: { _id: string; name: string; avatar: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = cookies.get("token");
  let currentUserId = "";
  if (token) {
    const decoded = jwtDecode<decodedtoken>(token);
    currentUserId = decoded.name;
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getProductReviews(productId);
        setReviews(data);
      } catch {
        toast.error("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  async function handleSubmit() {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      const review = await addReview({ productId, rating, comment });
      setReviews((prev) => [review, ...prev]);
      setComment("");
      setRating(5);
      toast.success("Review added!");
    } catch {
      toast.error("You already reviewed this product");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review deleted!");
    } catch {
      toast.error("Error deleting review");
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>

      {/* Add Review Form */}
      {token && (
        <div className="border rounded-xl p-6 mb-8">
          <h3 className="font-medium mb-4">Write a Review</h3>

          {/* Star Rating */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                className={`text-2xl transition-colors ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="w-full border rounded-lg p-3 text-sm mb-3 outline-none resize-none"
            rows={3}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-black text-white rounded-lg text-sm hover:opacity-80 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-400 text-sm">No reviews yet — be the first!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={review.user?.avatar || "/images/image-avatar.png"}
                      alt={review.user?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.user?.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {currentUserId === review.user?._id && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 my-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
