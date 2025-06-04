import { useContext, useEffect, useState } from "react";
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
import { CartContext } from "@/Contexts/CartContext";
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
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  const { cart, setCart } = context;
  const addProductToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add products to the cart.", {
        position: "bottom-left",
        autoClose: 2000,
      });
      return;
    }
    if (!productDetails) {
      toast.error("Product details are not available.", {
        position: "bottom-left",
        autoClose: 2000,
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const pendingOrder = cart.find((order: any) => order.status === "pending");

    // Calcola quantità attuale del prodotto nel carrello
    let currentQtyInCart = 0;
    if (pendingOrder) {
      const existingItem = pendingOrder.items.find(
        (item: any) => item.id === productId
      );
      if (existingItem) {
        currentQtyInCart = existingItem.quantity;
      }
    }

    const totalAfterAdd = currentQtyInCart + quantity;

    if (totalAfterAdd > productDetails.stock) {
      toast.error("The quantity exceeds available stock.", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    if (pendingOrder) {
      const updatedCart = cart.map((order: any) => {
        if (order.status === "pending") {
          const existingItem = order.items.find(
            (item: any) => item.id === productId
          );
          if (existingItem) {
            return {
              ...order,
              items: order.items.map((item: any) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              ...order,
              items: [
                ...order.items,
                {
                  id: productId,
                  quantity: quantity,
                  price: productDetails.price,
                  image_url:
                    productDetails.images.find((f) => f.is_main == 1)
                      ?.image_url || "",
                  product_name: productDetails.name,
                },
              ],
            };
          }
        }
        return order;
      });
      setCart(updatedCart);
    } else {
      const newOrder = {
        id: Date.now(),
        status: "pending",
        items: [
          {
            id: productId,
            quantity: quantity,
            price: productDetails.price,
            image_url:
              productDetails.images.find((f) => f.is_main == 1)?.image_url ||
              "",
            product_name: productDetails.name,
          },
        ],
      };
      setCart([...cart, newOrder]);
    }

    axios
      .post(
        "http://localhost:3000/api/order",
        {
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
        },
        config
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Error adding product to cart",
          {
            position: "bottom-right",
            autoClose: 2000,
          }
        );
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
          <span className="font-medium text-gray-800">
            {productDetails?.name}
          </span>
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
              className="w-[500px] h-[500px] object-center object-cover rounded-md"
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
                    className={`w-16 h-16 object-cover border-2 rounded-md overflow-hidden cursor-pointer ${
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
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {productDetails?.description}
            </p>
            {/* Stock Status & Out of Stock Handling */}
            {productDetails && productDetails.stock <= 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-500 font-semibold">
                  Out of stock
                </span>
              </div>
            )}
            {productDetails && productDetails.stock > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-500">
                  {productDetails.stock} available
                </span>
              </div>
            )}

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
                    if (!productDetails || productDetails.stock <= 0) return;

                    const pendingOrder = cart.find(
                      (order: any) => order.status === "pending"
                    );
                    const existingItem = pendingOrder?.items.find(
                      (item: any) => item.id === productId
                    );
                    const quantityInCart = existingItem
                      ? existingItem.quantity
                      : 0;

                    if (quantity + quantityInCart < productDetails.stock) {
                      setQuantity(quantity + 1);
                    } else {
                      toast.warning("Stock limit reached", {
                        position: "bottom-left",
                        autoClose: 2000,
                      });
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
              {/* <span className="text-sm text-gray-600">
                {productDetails && (
                  <span>
                    Stock:{" "}
                    <span className={productDetails.stock > 0 ? "text-green-600 font-semibold" : "text-red-500 font-bold"}>
                      {productDetails.stock}
                    </span>
                  </span>
                )}
              </span> */}
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={addProductToCart}
                disabled={
                  !productDetails ||
                  productDetails.stock -
                    (cart
                      .find((order: any) => order.status === "pending")
                      ?.items.find((item: any) => item.id === productId)
                      ?.quantity || 0) <=
                    0
                }
                className={`bg-black text-white py-3 px-6 rounded flex-1 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors ${
                  !productDetails ||
                  productDetails.stock -
                    (cart
                      .find((order: any) => order.status === "pending")
                      ?.items.find((item: any) => item.id === productId)
                      ?.quantity || 0) <=
                    0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <ShoppingCart size={18} />
                <span>ADD TO CART</span>
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-4 mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                {/* <span>✓</span> Free shipping on orders over €100 */}
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
                  {/* <div className="flex-1 max-w-md">
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
                  </div> */}
                </div>

                <button
                  onClick={() => {
                    setShowReviewModal(true);
                  }}
                  className="bg-white border cursor-pointer border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-50"
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
