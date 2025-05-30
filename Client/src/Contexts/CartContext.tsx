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
  stock?: number | null;
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
      <CartContext.Provider value={{ cart, setCart, refreshOrders: getOrders }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
