import OrderItemInfo from "./OrderItemInfo";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { FiPrinter } from "react-icons/fi";
import { TableDemo } from "./TableDemo";
import { ISellerOrder } from "./SellerDashbord";
import { useContext, useState } from "react";
import StatusTag from "./StatusTag";
import axios from "axios";
import { toast } from "react-toastify";
import { SectionContext } from "@/Contexts/SectionContext";
import { jsPDF } from "jspdf";

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
  const { setSection } = useContext(SectionContext);
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

  // const handlePrintOrder = () => {
  //   const doc = new jsPDF();

  //   // ==== HEADER SECTION ====
  //   // Logo Placeholder — adjust coordinates & size as needed
  //   doc.setDrawColor(0); // Black border
  //   doc.rect(15, 10, 40, 20); // Logo placeholder
  //   doc.setFontSize(10);
  //   doc.text("LOGO", 25, 23); // Placeholder text inside

  //   // Company Name
  //   doc.setFontSize(20);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("YOUR COMPANY NAME", 60, 25);

  //   // ==== INVOICE TITLE ====
  //   doc.setFontSize(16);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("INVOICE", 160, 25, { align: "right" });

  //   // Order Info Box
  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "normal");
  //   doc.setDrawColor(0);
  //   doc.rect(150, 35, 45, 20);
  //   doc.text(`Order #: ${order.order_id}`, 155, 42);
  //   doc.text(
  //     `${new Date(order.order_created_at).toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //       year: "numeric",
  //     })}`,
  //     155,
  //     50
  //   );

  //   // ==== CUSTOMER INFORMATION ====
  //   doc.setFontSize(13);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("CUSTOMER INFORMATION", 15, 65);
  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "normal");
  //   doc.setDrawColor(0);
  //   doc.rect(15, 70, 90, 25);
  //   doc.text(`Name: ${order.buyer_name ?? "-"}`, 20, 78);
  //   doc.text(`Email: ${order.buyer_email ?? "-"}`, 20, 85);
  //   doc.text(`Phone: ${order.buyer_phone ?? "-"}`, 20, 92);

  //   // ==== SHIPPING ADDRESS ====
  //   doc.setFontSize(13);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("SHIPPING ADDRESS", 120, 65);
  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "normal");
  //   doc.rect(120, 70, 75, 25);
  //   doc.text(`${order.buyer_address ?? "-"}`, 125, 78);
  //   doc.text(`${order.buyer_city ?? "-"} ${order.buyer_cap ?? "-"}`, 125, 85);

  //   // ==== PAYMENT & STATUS ====
  //   doc.setFontSize(13);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("PAYMENT & STATUS", 15, 105);
  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "normal");
  //   doc.rect(15, 110, 90, 20);
  //   doc.text("Payment: Credit Card", 20, 118);
  //   doc.text(`Status: ${order.status ?? "-"}`, 20, 126);

  //   // ==== ORDER ITEMS TABLE ====
  //   doc.setFontSize(13);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("ORDER ITEMS", 15, 140);

  //   // Table Headers
  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "bold");
  //   doc.setFillColor(230, 230, 230); // Light gray header background
  //   doc.rect(15, 145, 180, 10, "F");
  //   doc.setDrawColor(0);
  //   doc.rect(15, 145, 180, 10);
  //   doc.text("Product", 20, 152);
  //   doc.text("Qty", 140, 152);
  //   doc.text("Price", 165, 152);

  //   // Table Rows
  //   let yPos = 160;
  //   doc.setFont("helvetica", "normal");
  //   order.items.forEach((item: any, index: number) => {
  //     // Alternate row background
  //     if (index % 2 === 0) {
  //       doc.setFillColor(245, 245, 245); // very light gray
  //       doc.rect(15, yPos - 7, 180, 10, "F");
  //     }
  //     doc.setDrawColor(0);
  //     doc.rect(15, yPos - 7, 180, 10);

  //     doc.text(`${item.product_name || "Product"}`, 20, yPos);
  //     doc.text(`${item.quantity || 1}`, 140, yPos);
  //     doc.text(`€${item.price || "0.00"}`, 165, yPos);

  //     yPos += 12;
  //   });

  //   // ==== FOOTER ====
  //   const footerY = yPos + 15;
  //   doc.setDrawColor(0);
  //   doc.setLineWidth(0.5);
  //   doc.line(15, footerY, 195, footerY);

  //   doc.setFontSize(10);
  //   doc.text("Thank you for your business!", 15, footerY + 8);
  //   doc.text(
  //     `Generated on ${new Date().toLocaleDateString()}`,
  //     15,
  //     footerY + 14
  //   );

  //   // Save the PDF
  //   doc.save(`invoice_${order.order_id}.pdf`);
  // };

  return (
    <div className="w-[calc(100% - 180px)] font-[Poppins] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px] ">
      <div className="flex justify-between py-4 items-center my-4 flex-wrap gap-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSection("Orders");
              onClose();
            }}
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
        <div className="flex items-center gap-3">
          {/* <button
            onClick={handlePrintOrder}
            className="py-3 px-4 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm flex items-center gap-2 transition-colors"
            title="Stampa Ordine"
          >
            <FiPrinter size={16} />
            Print
          </button> */}
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
