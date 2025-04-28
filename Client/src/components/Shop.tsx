import { useState } from "react";
import Image from "../VID-IMG/Shop-Section_Img-min.jpg";
import Header from "./Header";
import { LuLayoutGrid } from "react-icons/lu";
import { TfiLayoutColumn2 } from "react-icons/tfi";
import pr from "../VID-IMG/pexels-blitzboy-1040945.jpg"

export default function Shop() {
  const [layout, setLayout] = useState<string>("viewLayout4");
  return (
    <>
      <Header />
      <div className="relative min-[992px]:px-11 h-[400px]">
        <img
          src={Image}
          alt="Cap"
          className="object-cover object-[100%_15%] h-[100%] w-[100%]"
        />
        <div className="absolute text-white bottom-[10%] left-[10%] font-['Josefin_Sans']">
          <h1
            style={{
              fontSize: "clamp(1rem, 1vw, 2rem)",
            }}
            className="font-bold "
          >
            Discover Unique Finds
          </h1>
          <p
            style={{
              fontSize: "clamp(0.8rem, 0.8vw, 1.8rem)",
            }}
          >
            Browse our latest selection of pre-loved fashion, handmade pieces,
            and vintage gems
            <br />
            ready to find a new home.
          </p>
        </div>
      </div>
      <div className="px-11 my-8 flex justify-between items-center">
        <button className="border-2 border-[#F8F8F8] px-6 py-2 cursor-pointer font-semibold ">
          Filter
        </button>
        <div className="flex gap-3">
          <LuLayoutGrid
            onClick={() => {
              setLayout("viewLayout4");
            }}
            className={`text-2xl cursor-pointer ${
              layout == "viewLayout4" ? "text-black" : "text-[#c9c5c5]"
            }`}
          />
          <TfiLayoutColumn2
            onClick={() => {
              setLayout("viewLayout6");
            }}
            className={`text-2xl cursor-pointer ${
              layout == "viewLayout6" ? "text-black" : "text-[#c9c5c5]"
            }`}
          />
        </div>
        <button className="border-2 border-[#F8F8F8] px-6 py-2 cursor-pointer font-semibold ">
          Sort
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,auto))] px-11 gap-x-6 font-['Josefin_Sans'] gap-y-5">
        <div className="cursor-pointer">
          <img src={pr} alt="Product" />
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
        <div>
          <img src={pr} alt="Product" />
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
        <div>
          <img src={pr} alt="Product" />
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
        <div>
          <img src={pr} alt="Product" />
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
        <div>
          <img src={pr} alt="Product" />
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
        <div>
          <img src={pr} alt="Product" />
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
      </div>
    </>
  );
}
