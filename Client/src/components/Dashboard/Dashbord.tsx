import SalesBox from "./SalesBox";
import { MdOutlineDiscount } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { ISellerOrder } from "../SellerDashbord";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OrderProps {
  orders: ISellerOrder[];
}

export default function Dashbord(orderProps: OrderProps) {
  const chartConfig = {
    desktop: {
      label: "Total Orders",
      color: "#5805E9",
    },
    completed: {
      label: "Completed",
      color: "#4CAF50",
    },
    shipped: {
      label: "Shipped",
      color: "#FFA500",
    },
  } satisfies ChartConfig;

  // Generazione dei dati mensili dinamici
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = months.map((month, index) => {
    const monthlyOrders = orderProps.orders.filter((order) => {
      const date = new Date(order.order_created_at);
      return date.getMonth() === index;
    });

    const total = monthlyOrders.length;
    const completed = monthlyOrders.filter(
      (order) => order.status === "completed"
    ).length;
    const shipped = monthlyOrders.filter(
      (order) => order.status === "Shipped"
    ).length;

    return {
      month,
      total,
      completed,
      shipped,
    };
  });

  return (
    <>
      <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,auto))] gap-3 mt-4 my-5">
          <SalesBox
            icon={
              <MdOutlineDiscount className="text-[40px] p-1.5 bg-[#FDEFD2] rounded-full text-[#283C4F]" />
            }
            sales={orderProps.orders.length}
            title="Orders"
          />
          <SalesBox
            icon={
              <MdOutlinePendingActions className="text-[40px] p-1.5 bg-[#CCE7FF] rounded-full text-[#283C4F]" />
            }
            sales={
              orderProps.orders.filter((order) => order.status === "completed")
                .length
            }
            title="Completed"
          />
          <SalesBox
            icon={
              <FaShippingFast className="text-[40px] p-1.5 bg-[#CEF3F2] rounded-full text-[#283C4F]" />
            }
            sales={
              orderProps.orders.filter((order) => order.status === "Shipped")
                .length
            }
            title="Shipped"
          />
        </div>
        <div className="my-4">
          <Card>
            <CardHeader>
              <CardTitle>Line Chart</CardTitle>
              <CardDescription>January - December</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 0,
                  }}
                >
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="month"
                    tickLine={true}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="total"
                    type="natural"
                    stroke={chartConfig.desktop.color}
                    strokeWidth={2}
                    dot={{ fill: chartConfig.desktop.color }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    dataKey="completed"
                    type="natural"
                    stroke={chartConfig.completed.color}
                    strokeWidth={2}
                    dot={{ fill: chartConfig.completed.color }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    dataKey="shipped"
                    type="natural"
                    stroke={chartConfig.shipped.color}
                    strokeWidth={2}
                    dot={{ fill: chartConfig.shipped.color }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
