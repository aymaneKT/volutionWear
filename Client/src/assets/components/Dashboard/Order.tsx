import BasicMenu from "./BasicMenu";
import HeadDashbord from "./HeadDashbord";

export default function Order() {
  return (
    <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
      <HeadDashbord />
      <div className="flex justify-between items-center">
        <ul className="flex gap-4 my-4">
          <li className="font-semibold cursor-pointer text-gray-400">All Orders</li>
          <li className="font-semibold cursor-pointer ">Dispatch</li>
          <li className="font-semibold cursor-pointer ">Panding</li>
          <li className="font-semibold cursor-pointer ">Completed</li>
        </ul>
        <div className="flex gap-4 items-center  p-1">
          <input
            type="date"
            className="outline-0 border-0 bg-[#F9F9F8] px-5 py-1 rounded-[8px]"
          />
          <span className="font-bold">To</span>
          <input
            type="date"
            className="outline-0 border-0 bg-[#F9F9F8] px-5 py-1 rounded-[8px]"
          />
        </div>
      </div>

      <table className="w-full border-separate my-4 border-spacing-y-2">
        <thead className="bg-[#f3f0f0] p-4 ">
          <tr >
            <td className="py-2 font-semibold px-3 rounded-tl-[10px] rounded-bl-[10px]">
              Id
            </td>
            <td className="py-2 font-semibold px-3">Customer</td>
            <td className="py-2 font-semibold px-3">Address</td>
            <td className="py-2 font-semibold px-3">Date</td>
            <td className="py-2 font-semibold px-3">Price</td>
            <td className="py-2 font-semibold px-3">Status</td>
            <td className="py-2 font-semibold px-3 rounded-tr-[10px] rounded-br-[10px]">
              Action
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-[10px] rounded-tl-[10px] rounded-bl-[10px]   border-[#f3f0f0] mt-4">
            <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
              #1
            </td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">John Doe</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">123 Main St</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">2023-10-01</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">$100.00</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">Pending</td>
            <td className="py-2 border-[#f3f0f0] border-3  border-l-0 px-3 rounded-tr-[10px] rounded-br-[10px]">
              <BasicMenu />
            </td>
          </tr>
          <tr className="border-[10px] rounded-tl-[10px] rounded-bl-[10px]   border-[#f3f0f0] mt-4">
            <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
              #1
            </td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">John Doe</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">123 Main St</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">2023-10-01</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">$100.00</td>
            <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">Pending</td>
            <td className="py-2 border-[#f3f0f0] border-3  border-l-0 px-3 rounded-tr-[10px] rounded-br-[10px]">
              <BasicMenu />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
