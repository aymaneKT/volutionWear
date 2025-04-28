import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";

interface FilterModalProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
}

export default function FilterModal({
  isFilterOpen,
  setIsFilterOpen,
}: FilterModalProps) {
  useEffect(() => {
    isFilterOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isFilterOpen]);

  return (
    <div
      style={{
        opacity: isFilterOpen ? "1" : "0",
        pointerEvents: isFilterOpen ? "auto" : "none",
      }}
      onClick={() => {
        setIsFilterOpen(false);
      }}
      className="fixed inset-0 bg-[#ffffff6d] z-50 flex justify-center items-center font-['Josefin_Sans'] transition duration-300"
    >
      <div
        style={{
          transform: isFilterOpen ? "translateY(0)" : "translateY(-20px)",
          opacity: isFilterOpen ? "1" : "0",
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative border-1 border-[black] transition duration-300"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            onClick={() => {
              setIsFilterOpen(false);
            }}
            className="text-2xl cursor-pointer"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold">Categories</h3>
            <FiChevronDown />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              "Tops",
              "Dresses",
              "Bottoms",
              "Outerwear",
              "Shoes",
              "Accessories",
            ].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  className="mr-2"
                />
                <label htmlFor={`category-${category}`}>{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes Section */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold">Sizes</h3>
            <FiChevronDown />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex items-center">
                <input type="checkbox" id={`size-${size}`} className="mr-2" />
                <label htmlFor={`size-${size}`}>{size}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold">Price Range</h3>
            <FiChevronDown />
          </div>
          <div className="mt-3">
            <div className="flex justify-between mb-2">
              <span>0 EUR</span>
              <span>500 EUR</span>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="500"
                defaultValue="0"
                className="w-1/2"
              />
              <input
                type="range"
                min="0"
                max="500"
                defaultValue="500"
                className="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Condition Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="font-semibold">Condition</h3>
            <FiChevronDown />
          </div>
          <div className="mt-3">
            {["New with tags", "Like new", "Good", "Fair", "Needs repair"].map(
              (condition) => (
                <div key={condition} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="condition"
                    id={`condition-${condition}`}
                    className="mr-2"
                  />
                  <label htmlFor={`condition-${condition}`}>{condition}</label>
                </div>
              )
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex-1 py-2 border-2 border-black hover:bg-gray-100 transition-colors">
            Reset
          </button>
          <button
            onClick={() => {
              setIsFilterOpen(false);
            }}
            className="flex-1 py-2 bg-black text-white border-2 border-black hover:bg-gray-800 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
