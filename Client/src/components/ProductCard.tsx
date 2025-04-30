import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import pr from "../VID-IMG/No_picture_available.png";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
type ImageType = {
  image_id: number;
  image_url: string;
  product_id: number;
  is_main: number;
};

type ProductCardProps = {
  product: {
    Seller: string;
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
      className=" h-auto cursor-pointer   mb-2 relative"
      onClick={() => {
        navigate(`/shop/product/${product.ProductId}`);
      }}
    >
      <div ref={sliderRef} className="keen-slider">
        {product.Images?.length ? (
          product.Images?.map((image, i) => (
            <img
              key={i}
              className="keen-slider__slide aspect-[3/4]"
              src={`http://localhost:3000/uploads/${image.image_url}`}
              alt={`Product image ${i + 1}`}
            />
          ))
        ) : (
          <img
            src={pr}
            alt="Fallback image"
            className="border-1  aspect-[3/4]"
          />
        )}
      </div>

      <span
        style={{
          fontSize: "clamp(0.9rem, 0.9vw, 1.9rem)",
        }}
        className="font-semibold"
      >
        {product.name}
      </span>
      <p className="text-[#54545498]">{product.description}</p>
      <span>{product.price} EUR</span>
      <HiArrowSmallRight
        className="absolute text-black text-[30px] font-semibold right-1 top-[45%] p-1 bg-white rounded-full cursor-pointer"
        onClick={() => {
          instanceRef.current?.next();
        }}
      />
      <HiArrowSmallLeft
        className="absolute text-black text-[30px] font-semibold left-1 top-[45%] p-1 bg-white rounded-full cursor-pointer"
        onClick={() => {
          instanceRef.current?.prev();
        }}
      />
    </div>
  );
}
