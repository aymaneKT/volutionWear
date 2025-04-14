import HeadDashbord from "./Dashboard/HeadDashbord";
import OrderItemInfo from "./OrderItemInfo";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRegNoteSticky } from "react-icons/fa6";
import { TableDemo } from "./TableDemo";
import StatusTag from "./StatusTag";
import { useState } from "react";

export type orderItemInfoIterationType = {
  title: string;
  icon: React.ReactNode;
  first?: string;
  second?: string;
  third?: string;
  isEditable: boolean;
};

export default function OrderDetails() {
  const [status, setStatus] = useState<string>("Pending");
  const mapOrderItem: orderItemInfoIterationType[] = [
    {
      title: "Customer",
      icon: <FaRegUser />,
      first: "Name",
      second: "Email ",
      third: "Phone",
      isEditable: false,
    },
    {
      title: "Order Info",
      icon: <IoCartOutline />,
      first: "Shipping",
      second: "Shipping",
      third: "Status",
      isEditable: false,
    },
    {
      title: "Payament Info",
      icon: <CiCreditCard1 />,
      first: "Card",
      second: "Business name",
      third: "Phone",
      isEditable: false,
    },
    {
      title: "Notes",
      icon: <FaRegNoteSticky />,
      isEditable: true,
    },
  ];
  return (
    <div className="w-[calc(100% - 180px)] font-[Poppins] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px] ">
      <HeadDashbord title="Order Details" subtitle="" />
      <div className="flex justify-between py-4 items-center my-4">
        <div className="flex flex-col gap-1">
          <span className="font-bold">Order ID : #222562</span>
          <p>Mon , July 22 , 2025</p>
          <StatusTag status={status} />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="py-3 px-4 bg-[#F1F3F4] rounded-md text-sm text-gray-700 outline-none"
        >
          <option value="" disabled selected>
            Change Status
          </option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))]  gap-3 my-4">
        {mapOrderItem.map((e: orderItemInfoIterationType, index: number) => (
          <OrderItemInfo {...e} key={index} />
        ))}
      </div>
      <button className="bg-[#EEE6FD] cursor-pointer text-[#5805E9] px-7 py-2 rounded-[8px] font-bold relative left-[80%] ">
        Save
      </button>

      <h2 className="uppercase my-4 font-bold">Products:</h2>
      <TableDemo />
    </div>
  );
}
