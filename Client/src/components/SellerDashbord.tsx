import { useEffect, useState } from "react";
import Dashbord from "./Dashboard/Dashbord";
import Order from "./Order";
import Products from "./Products";
import Offers from "./Offers";
import SideBar from "./SideBar";
import Profile from "./Profile";
import { SectionContext } from "@/Contexts/SectionContext";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import HeadDashbord from "./Dashboard/HeadDashbord";
import axios from "axios";
import OrderDetails from "./OrderDetails";
interface JwtPayload extends BaseJwtPayload {
  id?: number;
  is_seller?: boolean | string;
}
export interface ISellerOrderItem {
  id: number;
  product_name: string;
  price: string;
  stock: number;
  quantity: number;
  total_price: string;
  category_name: string;
  image_url: string;
}

export interface ISellerOrder {
  seller_order_id: number;
  order_id: number;
  status: string;
  total_amount: string;
  product_id: number;
  product_name: string;
  price: string;
  stock: number;
  quantity: number;
  category_name: string;
  image_url: string;
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_address: string;
  buyer_city: string;
  buyer_cap: string;
  buyer_country: string;
  buyer_phone: string;
  items: ISellerOrderItem[];
  order_created_at: string;
}

export default function SellerDashbord() {
  const navigate = useNavigate();
  const [section, setSection] = useState<string>("Profile");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<string>("");
  const [orders, setOrders] = useState<ISellerOrder[]>([]);
  const getOrders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:3000/api/sellerOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Orders fetched successfully:", response.data);
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);
  const sectionHandler = () => {
    switch (section) {
      case "Dashboard":
        return <Dashbord />;
      case "Orders":
        return <Order orders={orders} />;
      case "Products":
        return <Products />;
      case "Offers":
        return <Offers />;
      case "Profile":
        return <Profile />;
        case "OrderDetails":
      default:
        return <Dashbord />;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode<JwtPayload>(token);
      const { is_seller } = decode;

      if (is_seller === false || is_seller === "false") {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      setLoading(false);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString() + "");
    }, 1000);
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />
      <SectionContext.Provider
        value={{ section: section, setSection: setSection }}
      >
        <HeadDashbord subtitle={time} />
        <SideBar />
        {sectionHandler()}
      </SectionContext.Provider>
    </>
  );
}
