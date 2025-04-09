import BasicMenu from "./BasicMenu";
import HeadDashbord from "./HeadDashbord";

export default function Order() {
  return (
    <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
      <HeadDashbord title={"orders"} subtitle="28 Orders found" />
      <div className="flex  justify-between items-center flex-wrap ">
        <ul
          style={{ fontSize: "clamp(0.4rem, 3vw, 0.8rem)" }}
          className="flex gap-4 my-4 pl-2"
        >
          <li className="font-semibold cursor-pointer underline  decoration-2 decoration-[#5805E9] uppercase">
            All
          </li>
          <li className="font-semibold text-gray-400 cursor-pointer uppercase ">
            Dispatch
          </li>
          <li className="font-semibold text-gray-400 cursor-pointer uppercase ">
            Panding
          </li>
          <li className="font-semibold text-gray-400 cursor-pointer uppercase ">
            Completed
          </li>
        </ul>
        <div className="flex gap-4 items-center  p-1 flex-wrap">
          <input
            type="date"
            className=" border-2 grow outline-0  bg-[#F9F9F8] px-5 py-1 rounded-[6px]"
          />
          <input
            type="date"
            className=" border-2 grow outline-0  bg-[#F9F9F8] px-5 py-1 rounded-[8px]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          style={{ fontSize: "clamp(0.4rem, 3vw, 0.8rem" }}
          className="w-full table-auto border-separate my-4 border-spacing-y-2 "
        >
          <thead className="bg-[#f3f0f0] p-4 ">
            <tr>
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
            <tr className="border-[10px] cursor-pointer hover:text-white hover:bg-[#cbc0e0] rounded-tl-[10px] rounded-bl-[10px]   border-[#f3f0f0] mt-4">
              <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
                #1
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">
                John Doe
              </td>
              <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3  px-3">
                123 Main St, Cityville
              </td>
              <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3  px-3">
                2023-10-01
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">
                $100.00
              </td>
              <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3  px-3">
                Pending
              </td>
              <td className="py-2 border-[#f3f0f0] border-3  border-l-0 px-3 rounded-tr-[10px] rounded-br-[10px]">
                <BasicMenu />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
