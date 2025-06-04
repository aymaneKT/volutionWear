import OrderItemInfo from "./OrderItemInfo";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { TableDemo } from "./TableDemo";
import { ISellerOrder } from "./SellerDashbord";
import { useState } from "react";
import StatusTag from "./StatusTag";
import axios from "axios";
import { toast } from "react-toastify";
interface OrderModalProps {
  order: ISellerOrder;
  onClose: () => void;
  setSelectedOrder: (order: ISellerOrder) => void;
  handleOrderStatusChange: (orderId: number, newStatus: string) => void;
}

export type OrderInfoItemType = {
  sectionTitle: string;
  sectionIcon: React.ReactNode;
  labelOne?: string;
  valueOne?: string;
  labelTwo?: string;
  valueTwo?: string;
  labelThree?: string;
  valueThree?: string;
};
export default function OrderDetails({
  order,
  onClose,
  setSelectedOrder,
  handleOrderStatusChange,
}: OrderModalProps) {
  const [status, setStatus] = useState<string>(order.status || "");
  const mapOrderItem: OrderInfoItemType[] = [
    {
      sectionTitle: "Customer",
      sectionIcon: <FaRegUser />,
      labelOne: "Name",
      valueOne: order.buyer_name ?? "-",
      labelTwo: "Email",
      valueTwo: order.buyer_email ?? "-",
      labelThree: "Phone",
      valueThree: order.buyer_phone ?? "-",
    },
    {
      sectionTitle: "Order Info",
      sectionIcon: <IoCartOutline />,
      labelOne: "Shipping",
      valueOne:
        order.buyer_address + " " + order.buyer_city + " " + order.buyer_cap,
      labelTwo: "Payment Method",
      valueTwo: "CREDIT CARD",
      labelThree: "Status",
      valueThree: order.status ?? "-",
    },
    {
      sectionTitle: "Payment Info",
      sectionIcon: <CiCreditCard1 />,
      labelOne: "Card",
      valueOne: "VISA / MASTER CARD",
      labelTwo: "Business Name",
      valueTwo: order.buyer_name ?? "-",
    },
  ];

  const updateOrderStatusApi = (newStatus: string) => {
    axios
      .put(`http://localhost:3000/api/order`, {
        orderId: order.order_id,
        status: newStatus,
      })
      .then((response) => {
        toast.success(
          response.data.message || "Order status updated successfully"
        );
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  return (
    <div className="w-[calc(100% - 180px)] font-[Poppins] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px] ">
      <div className="flex justify-between py-4 items-center my-4 flex-wrap gap-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black cursor-pointer self-start mr-4"
            title="Close"
          >
            <FiArrowLeft size={24} />
          </button>
          <div className="flex flex-col gap-1">
            <span className="font-bold">Order ID: #{order.order_id}</span>
            <p>
              {new Date(order.order_created_at).toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <StatusTag status={status} />
          </div>
        </div>
        <select
          value={status}
          onChange={(e) => {
            const newStatus = e.target.value;
            setStatus(newStatus);
            setSelectedOrder({ ...order, status: newStatus });
            handleOrderStatusChange(order.order_id, newStatus);

            updateOrderStatusApi(newStatus);
          }}
          className="py-3 px-4 bg-[#F1F3F4] rounded-md text-sm text-gray-700 outline-none"
        >
          <option value="" disabled>
            Change Status
          </option>
          <option value="Completed">Completed</option>
          <option value="Shipped">Shipped</option>
        </select>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,auto))]  gap-3 my-4">
        {mapOrderItem.map((e: OrderInfoItemType, index: number) => (
          <OrderItemInfo {...e} key={index} />
        ))}
      </div>

      <h2 className="uppercase my-4 font-bold">Products:</h2>
      <TableDemo products={order.items} />
    </div>
  );
}
