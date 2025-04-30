import Rating from "@mui/material/Rating";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type ReviewModalProps = {
  showReviewModal: boolean;
  setShowReviewModal: (value: boolean) => void;
};

export default function ReviewModal({
  showReviewModal,
  setShowReviewModal,
}: ReviewModalProps) {
  const [userRating, setUserRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState<string>("");

  useEffect(() => {
    showReviewModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [showReviewModal]);

  return (
    <div
      style={{
        opacity: showReviewModal ? "1" : "0",
        pointerEvents: showReviewModal ? "auto" : "none",
      }}
      onClick={() => setShowReviewModal(false)}
      className="fixed  z-10 transition duration-300 font-[Poppins] top-0 bottom-0 right-0 left-0 max-[992px]:bottom-auto bg-[#ffffffdc] flex justify-center items-center"
    >
      <div
        style={{
          transform: showReviewModal ? "translateX(0)" : "translateX(-20px)",
          opacity: showReviewModal ? "1" : "0",
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-1 rounded-lg p-6 max-w-md w-full m-5"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Write a Review</h3>
          <button
            onClick={() => setShowReviewModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-2 font-medium">Your Rating</p>
          <Rating
            name="simple-controlled"
            value={userRating}
            onChange={(event, newValue) => {
              setUserRating(newValue);
            }}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="reviewText" className="block mb-2 font-medium">
            Your Review
          </label>
          <textarea
            id="reviewText"
            rows={4}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Share your experience with this product..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowReviewModal(false)}
            className="py-2 px-4 border border-gray-300"
            type="button"
          >
            Cancel
          </button>
          <button
            className={`bg-black text-white py-2 px-4 ${
              userRating === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="button"
            disabled={userRating === 0}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
