'use client'

import { useActionState, useEffect } from "react";
import reviewAction from "../_actions/reviewAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface ReviewFormProps {
  propertyId: string;
}

const ReviewForm = ({ propertyId }: ReviewFormProps) => {
  const [state, action, pending] = useActionState(reviewAction, false)
  const router = useRouter();
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Review submitted successfully");
      router.push("/dashboard/tenant/myReview")
    }

    if (!state.success) {
      toast.error(state.message || "Failed to submit review");
    }
  }, [state]);
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form action={action} className="space-y-4">
        <input
          type="hidden"
          name="propertyId"
          value={propertyId}
        />
        <div>
          <label htmlFor="rating" className="block p-2 text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            rows={4}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Write your review here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {
            pending ? "Submitting..." : "Submit Review"
          }
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;