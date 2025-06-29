import Rating from "@mui/material/Rating";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type ReviewModalProps = {
  showReviewModal: boolean;
  setShowReviewModal: (value: boolean) => void;
  productId: number;
  getReviews: (id: number) => void;
  reviewToEdit: { id: number | null; rating: number; comment: string };
};

type reviewModel = {
  rating: number;
  comment: string;
};

export default function ReviewModal({
  showReviewModal,
  setShowReviewModal,
  productId,
  getReviews,
  reviewToEdit,
}: ReviewModalProps) {
  const [userRating, setUserRating] = useState<reviewModel>({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    if (reviewToEdit?.id != null) {
      setUserRating({
        rating: reviewToEdit.rating,
        comment: reviewToEdit.comment,
      });
    } else {
      setUserRating({ rating: 0, comment: "" });
    }

    document.body.style.overflow = showReviewModal ? "hidden" : "visible";
  }, [showReviewModal, reviewToEdit]);

  const postReview = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    // Se esiste reviewToEdit, effettua una PUT, altrimenti una POST
    const request =
      reviewToEdit.id != null
        ? axios.put(
            `http://localhost:3000/api/review`,
            {
              productId: productId,
              rating: userRating.rating,
              comment: userRating.comment,
              reviewId: reviewToEdit.id,
            },
            config
          )
        : axios.post(
            "http://localhost:3000/api/review",
            {
              productId: productId,
              rating: userRating.rating,
              comment: userRating.comment,
            },
            config
          );

    request
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        getReviews(productId);
      })
      .catch((err) => {
        console.log(err);

        let message =
          err.response.data.message == "jwt expired" ||
          err.response.data.message == "jwt malformed"
            ? "You are not logged in. Please log in to submit a review."
            : "Failed to submit review. Please try again.";
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .finally(() => {
        setShowReviewModal(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          opacity: showReviewModal ? "1" : "0",
          pointerEvents: showReviewModal ? "auto" : "none",
        }}
        onClick={() => setShowReviewModal(false)}
        className="fixed z-10 transition duration-300 font-[Poppins] top-0 bottom-0 right-0 left-0 bg-[#ffffffdc] h-screen flex justify-center items-center"
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
            <h3 className="text-xl font-bold">
              {!reviewToEdit ? "Edit Review" : "Write a Review"}
            </h3>
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
              value={userRating.rating}
              onChange={(event, newValue) => {
                setUserRating({ ...userRating, rating: newValue ?? 0 });
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
              className="w-full border border-gray-300 rounded p-2 "
              placeholder="Share your experience with this product..."
              value={userRating.comment}
              onChange={(e) =>
                setUserRating({ ...userRating, comment: e.target.value })
              }
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
                userRating.rating === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              type="button"
              disabled={userRating.rating === 0}
              onClick={postReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
