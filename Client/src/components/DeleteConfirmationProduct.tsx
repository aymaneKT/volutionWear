import axios from "axios";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "react-toastify";

type DeleteConfirmationProductProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: (value: boolean) => void;
  productId: number | null;
  getProducts: (userId : number) => void;
  userId: number;
};

export default function DeleteConfirmationProduct({
  showDeleteModal,
  setShowDeleteModal,
  productId,
  getProducts,
  userId
}: DeleteConfirmationProductProps) {
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`http://localhost:3000/api/product/${productId}`, headers)
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        setShowDeleteModal(false);
        toast.success("Product deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getProducts(userId);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
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
            <AlertTriangle className="text-red-600" /> Delete Product
          </h2>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone and the product will be permanently removed from your
          inventory.
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
            className="cursor-pointer px-4 py-2  bg-[#f85959] text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
