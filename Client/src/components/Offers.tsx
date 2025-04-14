import { FaPlus } from "react-icons/fa";
import BasicMenu from "./Dashboard/BasicMenu";
import HeadDashbord from "./Dashboard/HeadDashbord";

export default function Offers() {
  return (
    <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
      <HeadDashbord title="Coupons" subtitle="All customized coupons" />
      <button className="flex items-center gap-1 mt-3 border-1 px-4 py-2 cursor-pointer text-[#7C7C7C] border-[#7C7C7C] left-[100%] -translate-x-[100%] rounded-[8px] relative right-0">
        <FaPlus />
        Add Coupon
      </button>
      <div className="overflow-x-auto font-[Poppins]">
        <table
          style={{ fontSize: "clamp(0.4rem, 3vw, 0.8rem)" }}
          className="w-full table-auto border-separate my-4 border-spacing-y-2"
        >
          <thead className="bg-[#f3f0f0] p-4">
            <tr>
              <td className="py-2 truncate font-semibold px-3 rounded-tl-[10px] rounded-bl-[10px]">
                Coupon Name
              </td>
              <td className="py-2 truncate font-semibold px-3">Expiry Date</td>
              <td className="py-2 truncate font-semibold px-3">Status</td>
              <td className="py-2 truncate font-semibold px-3">Discount %</td>
              <td className="py-2 truncate font-semibold px-3">Coupon Code</td>
              <td className="py-2 truncate font-semibold px-3">Usage Limit</td>
              <td className="py-2 truncate font-semibold px-3 rounded-tr-[10px] rounded-br-[10px]">
                Actions
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-[10px] cursor-pointer hover:text-white hover:bg-[#cbc0e0] rounded-tl-[10px] rounded-bl-[10px] border-[#f3f0f0] mt-4">
              <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
                Spring Sale
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                2025-05-30
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                Active
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                20%
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                SPRING2025
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                100 uses
              </td>
              <td className="py-2 border-[#f3f0f0] border-3 border-l-0 px-3 rounded-tr-[10px] rounded-br-[10px]">
                <BasicMenu />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
