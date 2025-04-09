import BasicMenu from "./Dashboard/BasicMenu";
import HeadDashbord from "./Dashboard/HeadDashbord";
import { FaPlus } from "react-icons/fa";
import img from "../VolutionWear.png";
export default function Products() {
  return (
    <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
      <HeadDashbord title="Products" subtitle="28 Products found" />
      <button className="flex items-center gap-1 mt-3 border-1 px-4 py-2 cursor-pointer text-[#7C7C7C] border-[#7C7C7C] left-[100%] -translate-x-[100%] rounded-[8px] relative right-0"><FaPlus />Add Product</button>
      <div className="overflow-x-auto">
        <table
          style={{ fontSize: "clamp(0.4rem, 3vw, 0.8rem)" }}
          className="w-full table-auto border-separate my-4 border-spacing-y-2"
        >
          <thead className="bg-[#f3f0f0] p-4">
            <tr>
              <td className="py-2 font-semibold px-3 rounded-tl-[10px] rounded-bl-[10px]">
                ID
              </td>
              <td className="py-2 font-semibold px-3 text-center">Product Name</td>
              <td className="py-2 font-semibold px-3">Category</td>
              <td className="py-2 font-semibold px-3">Stock</td>
              <td className="py-2 font-semibold px-3">Sold</td>
              <td className="py-2 font-semibold px-3">Price</td>
              <td className="py-2 font-semibold px-3">Status</td>
              <td className="py-2 font-semibold px-3 text-ce rounded-tr-[10px] rounded-br-[10px]">
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-[10px] cursor-pointer hover:text-white hover:bg-[#cbc0e0] rounded-tl-[10px] rounded-bl-[10px] border-[#f3f0f0] mt-4">
              <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
                #1
              </td>
              <td  className="py-2 flex justify-center items-center gap-1 text-center border-[#f3f0f0] border-t-3 border-b-3 px-3">
                <img src={img} alt="Product Img" className="w-[60px] h-[60px] mix-blend-multiply rounded-full" /> Wireless Mouse
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                Electronics
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                150
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                85
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                $25.99
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                In Stock
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
