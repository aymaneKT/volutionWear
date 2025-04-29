import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import pr from "../VID-IMG/pexels-blitzboy-1040945.jpg";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";

export default function ProductCard() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    drag:false,
    renderMode: "performance",
    defaultAnimation: {
      duration: 700,
    },
  });
  return (
    <div className=" h-auto    mb-2 relative">
      <div
        ref={sliderRef}
        className="keen-slider"
      >
        <img
          src={pr}
          className="keen-slider__slide"
          alt="Product"
          loading="lazy"
        />
        <img
          src={pr}
          className="keen-slider__slide"
          alt="Product"
          loading="lazy"
        />
        <img
          src={pr}
          className="keen-slider__slide"
          alt="Product"
          loading="lazy"
        />
        <img
          src={pr}
          className="keen-slider__slide"
          alt="Product"
          loading="lazy"
        />
        <img
          src={pr}
          className="keen-slider__slide"
          alt="Product"
          loading="lazy"
        />
      </div>

      <span
        style={{
          fontSize: "clamp(0.8rem, 0.8vw, 1.8rem)",
        }}
        className="font-semibold"
      >
        SHOES AIR FORCE 1
      </span>
      <p className="text-[#54545498]">Lorem ipsum dolor sit amet.</p>
      <span>289 EUR</span>
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
