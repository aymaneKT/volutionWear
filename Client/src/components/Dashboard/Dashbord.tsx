import HeadDashbord from "./HeadDashbord";
import SalesBox from "./SalesBox";
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import Chart from "./Chart";

export default function Dashbord() {
  return (
    <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
      <HeadDashbord title="Dashboard" subtitle="Live Orders" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,auto))] gap-3 mt-4 my-5">
        <SalesBox
          icon={
            <MdOutlineDiscount className="text-[40px] p-1.5 bg-[#FDEFD2] rounded-full text-[#283C4F]" />
          }
          sales={47}
          title="Orders"
        />
        <SalesBox
          icon={
            <MdOutlinePendingActions className="text-[40px] p-1.5 bg-[#CCE7FF] rounded-full text-[#283C4F]" />
          }
          sales={56}
          title="Total Pending"
        />
        <SalesBox
          icon={
            <FaShippingFast className="text-[40px] p-1.5 bg-[#CEF3F2] rounded-full text-[#283C4F]" />
          }
          sales={26}
          title="Total Dispatch"
        />
      </div>
      <Chart />
    </div>
  );
}
