import axios from "axios";
import { toast } from "react-toastify";

type DeleteProductModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  productId: number | null;
  getProducts: (id: number) => void;
  userId: number;
};

export default function DeleteProductModal({
  isOpen,
  setIsOpen,
  productId,
  getProducts,
  userId,
}: DeleteProductModalProps) {
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to be logged in to delete a product", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`http://localhost:3000/api/product/${productId}` ,headers)
      .then(() => {
        setIsOpen(false);
        getProducts(userId);
        toast.success("Product deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        // Handle error (e.g., show error message)
        console.error("Failed to delete product:", error);
      });
  };

  return (
    <div
      style={{
        opacity: isOpen ? "1" : "0",
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={() => setIsOpen(false)}
      className="fixed z-10 transition duration-300 font-[Poppins] top-0 bottom-0 right-0 left-0 bg-[#ffffffdc] flex justify-center items-center"
    >
      <div
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-20px)",
          opacity: isOpen ? "1" : "0",
        }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col border-2 rounded-[8px] bg-white p-9 w-[90%] max-[992px]:w-screen m-5 gap-5 relative"
      >
        <h2 className="text-lg font-semibold text-gray-800">Delete Product</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>

        <div className="flex gap-2 self-end mt-4">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="cursor-pointer bg-[#7E7E7E] text-white rounded-[7px] px-4 py-1.5"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer text-white rounded-[7px] bg-red-600 px-4 py-1.5"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
