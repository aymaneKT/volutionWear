import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import pr from "../VID-IMG/No_picture_available.png";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

type ImageType = {
  image_id: number;
  image_url: string;
  product_id: number;
  is_main: number;
};

type ProductCardProps = {
  product: {
    username: string;
    avgReview: number;
    ProductId: number;
    name: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    Images: ImageType[];
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    drag: false,
    renderMode: "performance",
    defaultAnimation: {
      duration: 700,
    },
  });
  const navigate = useNavigate();
  return (
    <div
      className="h-[500px] cursor-pointer mb-2 relative border-2 border-gray-200 rounded-lg p-2 flex flex-col gap-1 hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={() => {
        navigate(`/shop/product/${product.ProductId}`);
      }}
    >
      <div ref={sliderRef} className="keen-slider">
        {product.Images.length ? (
          product.Images.map((image, i) => (
            <div
              key={i}
              className="keen-slider__slide  relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={`http://localhost:3000/uploads/${image.image_url}`}
                alt={`Product image ${i + 1}`}
                className="w-full h-full object-cover   rounded-lg"
              />
              <HiArrowSmallRight
                className="absolute border-1 border-black text-black text-[30px] font-semibold right-1 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                style={{
                  display: product.Images.length > 1 ? "block" : "none",
                }}
              />
              <HiArrowSmallLeft
                className="absolute border-1 border-black text-black text-[30px] font-semibold left-1 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                style={{
                  display: product.Images.length > 1 ? "block" : "none",
                }}
              />
            </div>
          ))
        ) : (
          <img
            src={pr}
            alt="Fallback image"
            className="border-1 aspect-[3/4]"
          />
        )}
      </div>

      {/* Username */}
      <div className="flex items-end justify-between mt-1 flex-wrap">
        <span
          style={{
            fontSize: "clamp(0.8rem, 0.8vw, 1.7rem)",
          }}
          className="text-gray-600"
        >
          Seller: <span className="font-bold">{product.username}</span>
        </span>

        {/* Rating stars */}
        <div className="flex items-center overflow-hidden">
          <Rating
            name="read-only"
            value={product.avgReview}
            readOnly
            size="small"
          />
          <span className="ml-1 text-sm  text-gray-600">
            {product.avgReview ? Number(product.avgReview).toFixed(2) : "N/A"}
          </span>
        </div>
      </div>

      <span
        style={{
          fontSize: "clamp(0.9rem, 0.9vw, 1.9rem)",
        }}
        className="font-semibold"
      >
        {product.name}
      </span>
      <p className="text-[#54545498] truncate">{product.description}</p>
      <span>{product.price} EUR</span>
    </div>
  );
}
