import { useEffect, useState } from "react";
import Header from "./Header";
import pp from "../VID-IMG/No_picture_available.png";
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react";
import Rating from "@mui/material/Rating";
import ReviewModal from "./ReviewModal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
interface JwtPayload extends BaseJwtPayload {
  id?: number;
}
type ImageType = {
  image_id: number;
  image_url: string;
  product_id: number;
  is_main: number;
};

type ReviewType = {
  UserId: number;
  reviewId: number;
  username: string;
  comment: string;
  image: string;
  rating: number;
  created_at: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  images: ImageType[];
  reviews: ReviewType[];
};

type reviewToEditType = {
  id: number | null;
  rating: number;
  comment: string;
};
export default function ProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [productDetails, setProductDetails] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<reviewToEditType>({
    id: 0,
    rating: 0,
    comment: "",
  });
  const productId = Number(useParams().id);

  const handleImageClick = (imageId: number) => {
    if (!productDetails || !productDetails.images) return;
    const updatedImages: ImageType[] = productDetails?.images.map((image) => ({
      ...image,
      is_main: image.image_id == imageId ? 1 : 0,
    }));

    setProductDetails({ ...productDetails, images: updatedImages });
  };
  const getReviews = (productId: Number) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/product/${productId}`)
      .then((res) => {
        setProductDetails(res.data.product);
        console.log(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addProductToCart = () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        "http://localhost:3000/api/order",
        {
          productId: productId,
          quantity: quantity,
          price: productDetails?.price,
        },
        config
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(
          err.response.data.message || "Error adding product to cart",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Error adding product to cart:", err);
      });
  };
  useEffect(() => {
    if (!showReviewModal) {
      setSelectedReview({ id: null, rating: 0, comment: "" });
    }
  }, [showReviewModal]);

  useEffect(() => {
    getReviews(productId);
  }, []);
  const averageRating = productDetails?.reviews.length
    ? productDetails.reviews.reduce((sum, review) => sum + review.rating, 0) /
      productDetails.reviews.length
    : 0;

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { id } = jwtDecode<JwtPayload>(token);
      return id;
    }
    return null;
  };

  return (
    <>
      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        selectedId={selectedId}
        getReviews={getReviews}
        productId={productId}
      />
      <Loader isLoading={isLoading} />
      <ReviewModal
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        productId={productId}
        getReviews={getReviews}
        reviewToEdit={selectedReview || { id: null, rating: 0, comment: "" }}
      />
      <div className="px-4 md:px-8 lg:px-11 pb-16 bg-gray-50">
        <Header />

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 mt-4">
          <Link to="/">Home</Link> /<Link to="/shop">Products</Link> /{" "}
          <span className="font-medium text-gray-800">Prodotto</span>
        </div>

        {/* Product Section */}
        <div className="flex flex-wrap justify-between gap-8 bg-white p-6 rounded-lg shadow-sm">
          {/* Product Image */}
          <div className="flex-1 min-w-[280px]">
            <img
              src={`http://localhost:3000/uploads/${
                productDetails?.images.find((f) => f.is_main == 1)?.image_url
              }`}
              alt="Product Image"
              className="w-full max-w-[700px] object-cover rounded-md"
            />

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4">
              {productDetails?.images
                .filter((i) => i.is_main == 0)
                .map((e, i) => (
                  <div
                    onClick={() => {
                      handleImageClick(e.image_id);
                    }}
                    key={i}
                    className={`w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer ${
                      i === 0 ? "border-black" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={`http://localhost:3000/uploads/${e.image_url}`}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
            {/* Reviews */}
            <div className="flex items-center gap-2">
              <Rating name="read-only" value={averageRating} readOnly />
              <span className="text-sm text-gray-600">
                {productDetails?.reviews.length}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
              {productDetails?.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">
                {productDetails?.price} EUR
              </span>
              <span className="text-lg text-gray-500 line-through"></span>
              {/* <span className="bg-red-100 text-red-700 px-2 py-1 text-sm font-medium rounded">
              -25%
            </span> */}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {productDetails?.description}
            </p>
            

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="font-medium">Quantity:</span>
              <div className="flex border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border-r border-gray-300 cursor-pointer"
                >
                  <ChevronDown size={16} />
                </button>
                <span className="px-4 py-1 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    if (
                      productDetails &&
                      productDetails.stock > 0 &&
                      quantity < productDetails.stock
                    ) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  className="px-3 py-1 border-l border-gray-300 cursor-pointer"
                >
                  <ChevronUp size={16} />
                </button>
              </div>
            </div>
            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {productDetails && productDetails?.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
              {productDetails && productDetails?.stock > 0 && (
                <span className="text-sm text-green-500">
                  {productDetails?.stock} available
                </span>
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={addProductToCart}
                disabled={productDetails && productDetails.stock == 0}
                className="bg-black cursor-pointer text-white py-3 px-6 rounded flex-1 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart size={18} />
                <span>ADD TO CART</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-4 mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span>✓</span> Free shipping on orders over €100
              </p>
              <p className="flex items-center gap-2">
                <span>✓</span> Estimated delivery: 3–5 business days
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium cursor-pointer capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {productDetails?.description}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex">
                      <Rating name="read-only" value={averageRating} readOnly />
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Based on {productDetails?.reviews.length} reviews
                    </p>
                  </div>
                  <div className="flex-1 max-w-md">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-6">
                          {rating}
                        </span>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full"
                            style={{
                              width: `${
                                rating === 5
                                  ? 70
                                  : rating === 4
                                  ? 20
                                  : rating === 3
                                  ? 7
                                  : rating === 2
                                  ? 2
                                  : 1
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5
                            ? "70%"
                            : rating === 4
                            ? "20%"
                            : rating === 3
                            ? "7%"
                            : rating === 2
                            ? "2%"
                            : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowReviewModal(true);
                  }}
                  className="bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-50"
                >
                  Add a review
                </button>

                {/* Reviews with Edit & Delete buttons */}
                <div className="divide-y divide-gray-100">
                  {productDetails?.reviews.map((review, index) => (
                    <div key={index} className="py-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              review.image != null
                                ? `http://localhost:3000/uploads/${review.image}`
                                : pp
                            }
                            className="h-[70px] w-[70px] object-center  mix-blend-multiply rounded-full"
                            alt={`${review.username} picture`}
                          />

                          <div>
                            <p className="font-medium">{review.username}</p>
                            <div className="flex mt-1">
                              <Rating
                                name="read-only"
                                value={review.rating}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mr-4   flex-wrap-reverse justify-end">
                          {getUserId() == review.UserId ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedReview({
                                    ...selectedReview,
                                    id: review.reviewId,
                                    comment: review.comment,
                                    rating: review.rating,
                                  });
                                  setShowReviewModal(true);
                                }}
                                className="cursor-pointer p-1 text-gray-600 hover:text-blue-600 transition-colors"
                                title="Edit Review"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedId(review.reviewId);
                                  setShowDeleteModal(true);
                                }}
                                className="cursor-pointer p-1 text-gray-600 hover:text-red-600 transition-colors"
                                title="Delete Review"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          <span className="text-sm text-gray-500 ">
                            {new Date(
                              `${review.created_at}`
                            ).toLocaleDateString("it-IT")}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
