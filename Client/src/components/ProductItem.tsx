import { useEffect } from "react";
import img from "../VID-IMG/VolutionWear.png";
import Checkbox from "./CheckBox";
import InputImage from "./InputImage";
type ProductItemType = {
  isOpenProductInfo: boolean;
  setIsOpenMenuInfo: (value: boolean) => void;
};
export default function ProductItem(props: ProductItemType) {
  const { isOpenProductInfo, setIsOpenMenuInfo } = props;
  useEffect(() => {
    isOpenProductInfo
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [isOpenProductInfo]);
  return (
    <div
      style={{
        opacity: isOpenProductInfo ? 1 : 0,
        pointerEvents: isOpenProductInfo ? "auto" : "none",
      }}
      onClick={() => {
        setIsOpenMenuInfo(false);
      }}
      className="absolute items-center  z-10 transition duration-200  top-0 bottom-0 right-0 left-0 font-[Poppins] max-[992px]:bottom-auto bg-[#ffffffdc] flex justify-center "
    >
      <div
        style={{
          transform: isOpenProductInfo ? "translateX(0)" : "translateX(-20px)",
          opacity: isOpenProductInfo ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
        className="flex  justify-between transition duration-200 items-end  border-2 rounded-[8px] bg-white p-9 w-[90%] max-[992px]:w-screen m-5  flex-wrap gap-5"
      >
        {/* left part */}
        <div className=" flex flex-col  gap-2.5 grow  ">
          <div className="flex flex-col gap-2.5">
            <span className="text-[#7F8292] font-medium ">Main Image</span>
            <img
              src={img}
              className="w-[100%] h-auto object-center object-cover aspect-16/9 rounded-[8px]"
              alt="Main Image"
            />
          </div>
          <div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[#7F8292] font-medium">Other Images</span>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,auto))] gap-1.5 ">
                <img src={img} alt="Main Image" />
                <img src={img} alt="Main Image" />
                <img src={img} alt="Main Image" />
                <img src={img} alt="Main Image" />
                <img src={img} alt="Main Image" />
                <img src={img} alt="Main Image" />
              </div>
              <InputImage />
            </div>
          </div>
        </div>
        {/* ==left part== */}
        {/* right part */}
        <div className="grow-5 flex flex-col gap-2 item-s">
          <div>
            <label className="block  text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              className="mt-1 focus:bg-[#b348ff0e]  block w-full border-b-1 border-gray-500 outline-none p-2"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 focus:bg-[#b348ff0e] resize-none block w-full border border-gray-300 rounded-md p-2"
              rows={3}
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (€)
            </label>
            <input
              type="number"
              step="0.01"
              className="mt-1 focus:bg-[#b348ff0e]  block w-full border-b-1 border-gray-500 outline-none p-2"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block focus:bg-[#b348ff0e]text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              className="mt-1 block focus:bg-[#b348ff0e] w-full border-b-1 border-gray-500 outline-none p-2"
              placeholder="Enter quantity in stock"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              className="mt-1 focus:bg-[#b348ff0e]  block w-full border-b-1 border-gray-500 outline-none p-2"
              placeholder="Enter product category"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox />
            <label htmlFor="active" className="text-sm text-gray-700">
              Product Active
            </label>
          </div>
          <div className="flex gap-2 self-end my-4 ">
            <button
              onClick={() => {
                setIsOpenMenuInfo(false);
              }}
              className="cursor-pointer bg-[#7E7E7E] text-white  rounded-[7px]  px-4  py-1.5"
            >
              Cancel
            </button>
            <button className="cursor-pointer text-white  rounded-[7px] bg-purple-600 px-4  py-1.5">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
