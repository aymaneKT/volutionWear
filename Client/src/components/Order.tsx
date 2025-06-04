import { useContext, useState } from "react";
import { ISellerOrder } from "./SellerDashbord";
import OrderDetails from "./OrderDetails";
import { SectionContext } from "@/Contexts/SectionContext";

interface OrderProps {
  orders: ISellerOrder[];
  setOrders: React.Dispatch<React.SetStateAction<ISellerOrder[]>>;
}

export default function Order(props: OrderProps) {
  const [selectedOrder, setSelectedOrder] = useState<ISellerOrder | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { section, setSection } = useContext(SectionContext);
  const { orders, setOrders } = props;

  const tableHeaders = [
    { label: "Id", className: "rounded-tl-[10px] rounded-bl-[10px]" },
    { label: "Customer", className: "" },
    { label: "Address", className: "" },
    { label: "Date", className: "" },
    { label: "Price", className: "" },
    { label: "Status", className: "rounded-tr-[10px] rounded-br-[10px]" },
  ];

  const handleOrderStatusChange = (orderId: number, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder((prevOrder) =>
      prevOrder ? { ...prevOrder, status: newStatus } : prevOrder
    );
  };

  // 🔎 FILTRO ORDINI PER RANGE DATE
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.order_created_at);

    let isAfterStart = true;
    let isBeforeEnd = true;

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0); // reset orario
      isAfterStart = orderDate >= start;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // fine giornata
      isBeforeEnd = orderDate <= end;
    }

    return isAfterStart && isBeforeEnd;
  });

  return (
    <>
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          setSelectedOrder={setSelectedOrder}
          handleOrderStatusChange={handleOrderStatusChange}
        />
      )}
      <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex gap-4 items-center p-1 flex-wrap">
            <input
              type="date"
              className="border-2 grow outline-0 bg-[#F9F9F8] px-5 py-1 rounded-[6px]"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border-2 grow outline-0 bg-[#F9F9F8] px-5 py-1 rounded-[8px]"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto font-[Poppins]">
          <table
            style={{ fontSize: "clamp(0.4rem, 3vw, 0.8rem)" }}
            className="w-full table-auto border-separate my-4 border-spacing-y-2"
          >
            <thead className="bg-[#f3f0f0] p-4">
              <tr>
                {tableHeaders.map((header) => (
                  <td
                    key={header.label}
                    className={`py-2 font-semibold px-3 ${header.className}`}
                  >
                    {header.label}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  onClick={() => {
                    setSelectedOrder(order);
                    setSection("OrderDetails");
                  }}
                  key={order.order_id}
                  className="border-[10px] cursor-pointer hover:text-white hover:bg-[#cbc0e0] border-[#f3f0f0] mt-4"
                >
                  <td className="py-2 px-3 border-r-0 border-3 border-[#f3f0f0] rounded-tl-[10px] rounded-bl-[10px]">
                    #{order.order_id}
                  </td>
                  <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                    {order.buyer_name ?? "N/A"}
                  </td>
                  <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                    {order.buyer_address}
                  </td>
                  <td className="py-2 truncate border-[#f3f0f0] border-t-3 border-b-3 px-3">
                    {new Date(order.order_created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3">
                    ${order.price}
                  </td>
                  <td className="py-2 border-[#f3f0f0] border-t-3 border-b-3 px-3 rounded-tr-[10px] rounded-br-[10px] border-r-2">
                    {order.status}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No orders found for the selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
