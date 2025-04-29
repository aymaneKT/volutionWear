import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import pr from "../VID-IMG/pexels-blitzboy-1040945.jpg";

export default function ProductCard() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    defaultAnimation: {
      duration: 700,
    },
  });
  return (
    <div className="cursor-grab h-auto  active:cursor-grabbing  mb-2">
      <div
        ref={sliderRef}
        className="keen-slider object-center"
        onMouseLeave={() => {
          instanceRef.current?.prev();
        }}
        onMouseEnter={() => {
          instanceRef.current?.moveToIdx(1);
        }}
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
    </div>
  );
}
