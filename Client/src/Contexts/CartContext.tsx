import Loader from "@/components/Loader";
import axios from "axios";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
interface JwtPayload extends BaseJwtPayload {
  id?: number;
}
export interface OrderItem {
  id: number;
  product_name: string;
  price: string;
  quantity: number;
  category_name: string;
  image_url: string;
}

export interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: string;
  created_at: string;
  items: OrderItem[];
}
export const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState<Order[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOrders = () => {
    // setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCart(res.data.orders);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error fetching orders!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const { id } = decoded;
      if (id) getOrders();
    }
  }, []);

  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}
      <ToastContainer />
      <CartContext.Provider value={{ cart, setCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
