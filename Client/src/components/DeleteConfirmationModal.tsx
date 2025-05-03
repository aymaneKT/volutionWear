import axios from "axios";
import { X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface DeleteConfirmationModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (value: boolean) => void;
  selectedId: number | null;
  getReviews: (productId: number) => void;
  productId: number;
}

export default function DeleteConfirmationModal({
  showDeleteModal,
  setShowDeleteModal,
  selectedId,
  getReviews,
  productId,
}: DeleteConfirmationModalProps) {
  useEffect(() => {
    document.body.style.overflow = showDeleteModal ? "hidden" : "auto";
  }, [showDeleteModal]);

  const handleDelete = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .delete(`http://localhost:3000/api/review/${selectedId}`, config)
      .then((res) => {
        console.log(res);
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
        setShowDeleteModal(false);
      })
      .catch(() => {
        toast.error("An error occurred while deleting the review.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div
      onClick={() => setShowDeleteModal(false)}
      className={`fixed inset-0 z-50 bg-[#ffffffdc] flex items-center justify-center transition-opacity duration-300 ${
        showDeleteModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md transition-all duration-300 transform ${
          showDeleteModal ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="text-red-600" /> Delete Confirmation
          </h2>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this review? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
