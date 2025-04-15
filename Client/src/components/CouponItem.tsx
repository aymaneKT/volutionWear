type couponItemType = {
  isOpenCouponMenu: boolean,
  setIsOpenCouponMenu: (value: boolean) => void;
};
export default function CouponItem(props: couponItemType) {
  const { isOpenCouponMenu, setIsOpenCouponMenu } = props;
  return (
    <div
      style={{
        opacity: isOpenCouponMenu ? "1" : "0",
        pointerEvents: isOpenCouponMenu ? "auto" : "none",
      }}
      onClick={() => {
        setIsOpenCouponMenu(false);
      }}
      className="absolute z-10 transition duration-300 font-[Poppins] top-0 bottom-0 right-0 left-0 max-[992px]:bottom-auto bg-[#ffffffdc] flex justify-center items-center"
    >
      <div
        style={{
          transform: isOpenCouponMenu ? "translateX(0)" : "translateX(-20px)",
          opacity: isOpenCouponMenu ? "1" : "0",
        }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col  border-2 rounded-[8px] bg-white p-9 w-[90%] max-[992px]:w-screen m-5 gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Coupon Name
          </label>
          <input
            type="text"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Enter coupon name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount (%)
          </label>
          <input
            type="number"
            step="0.01"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Enter discount percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Enter coupon code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usage Limit
          </label>
          <input
            type="number"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Enter usage limit"
          />
        </div>

        {/* <div className="flex items-center gap-2 pt-2">
          <Checkbox />
          <label htmlFor="status" className="text-sm text-gray-700">
            Coupon Active
          </label>
        </div> */}

        <div className="flex gap-2 self-end my-4">
          <button onClick={()=>{
            setIsOpenCouponMenu(false)
          }} className="cursor-pointer bg-[#7E7E7E] text-white rounded-[7px] px-4 py-1.5">
            Cancel
          </button>
          <button className="cursor-pointer text-white rounded-[7px] bg-purple-600 px-4 py-1.5">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
