import { useEffect, useState } from "react";
import Image from "../VID-IMG/Shop-Section_Img-min.jpg";
import Header from "./Header";
import { LuLayoutGrid } from "react-icons/lu";
import { TfiLayoutColumn2 } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";
import HomeFooter from "./Footer";
import { IoFilterSharp } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import FilterModal from "./FilterModal";

import ProductCard from "./ProductCard";
import axios from "axios";
import Loader from "./Loader";
type productType = {
  Seller: string;
  ProductId: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  Images: [];
};

export default function Shop() {
  const [layout, setLayout] = useState<string>("viewLayout4");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isOpenSortList, setIsOpenSortList] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>("priceAsc");
  const [products, setProducts] = useState<productType[] | undefined>();

  const sortOptions = [
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "nameAsc", label: "Name: A-Z" },
    { value: "nameDesc", label: "Name: Z-A" },
    { value: "ratingDesc", label: "Rating: High to Low" },
    { value: "ratingAsc", label: "Rating: Low to High" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "oldest", label: "Oldest Arrivals" },
    { value: "popularityDesc", label: "Most Popular" },
    { value: "popularityAsc", label: "Least Popular" },
  ];
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        setProducts(res.data.productsWimages);
        console.log(res.data.productsWimages);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} /> 
      <div>
        <Header />
        <div className="relative min-[992px]:px-11 h-[400px]">
          <img
            src={Image}
            alt="Image"
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
        <div className="px-11 mt-8 mb-4">
          <div className="relative w-full max-w-md mx-auto font-['Josefin_Sans']">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full py-2 pl-4 pr-10 border-2 border-[black] focus:outline-none"
            />
            <button className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2">
              <FiSearch className="text-xl" />
            </button>
          </div>
        </div>
        <div className="px-11 my-8 flex justify-between items-center ">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="border-2 border-[#c0bcbc45] flex items-center gap-2 px-6 py-2 cursor-pointer font-semibold "
          >
            <IoFilterSharp />
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
          <button
            onClick={() => {
              setIsOpenSortList(!isOpenSortList);
            }}
            className="border-2 relative flex items-center gap-2 border-[#c0bcbc45] px-6 py-2 cursor-pointer font-semibold "
          >
            <FaSort />
            Sort
            <ul
              className={`absolute w-[150px] transition-all z-5   ${
                isOpenSortList ? "border-1" : "border-0"
              }   duration-450  ${
                isOpenSortList ? "max-h-[500px]" : "max-h-0"
              }  overflow-hidden  flex flex-col gap-2 bg-white top-[101%]  left-[-30%]`}
            >
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => setSelectedSort(option.value)}
                  className={`cursor-pointer flex items-center justify-center  text-[12px] border-t-2 py-2 font-normal hover:underline ${
                    selectedSort === option.value
                      ? " text-blue-500 font-semibold"
                      : ""
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </button>
        </div>
        <FilterModal
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        {/* Products */}
        <div
          className={`grid  ${
            layout === "viewLayout4"
              ? "grid-cols-[repeat(auto-fill,minmax(300px,auto))]"
              : "grid-cols-2"
          }  px-11 my-10 gap-x-6 font-['Josefin_Sans'] gap-y-5`}
        >
          {products &&
            products.map((product: productType, i: number) => (
              <ProductCard key={i} product={product} />
            ))}
        </div>
        <HomeFooter />
      </div>
    </>
  );
}
