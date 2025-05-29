import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import { useContext, useEffect } from "react";
import img from "C:/Users/ayman/OneDrive/Desktop/img.jpg";
import { CartContext, OrderItem } from "@/Contexts/CartContext";
import { Order } from "./UserProfile";
import axios from "axios";
import { toast } from "react-toastify";

type CartProps = {
  isOpenCartMenu: boolean;
  setIsOpenCartMenu: (value: boolean) => void;
};

export default function Cart(props: CartProps) {
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  const { cart, setCart } = context;
  useEffect(() => {
    props.isOpenCartMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [props.isOpenCartMenu]);

  const pendingCartItems: Order[] = cart.filter(
    (item: Order) => item.status === "pending"
  );
  const axiosUpdateQuantity = (item: OrderItem, newQuantity: number) => {
    axios
      .put(
        `http://localhost:3000/api/order/product/`,
        {
          quantity: newQuantity,
          productId: item.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        const updatedCart = cart.map((order: any) => {
          if (order.status === "pending") {
            return {
              ...order,
              items: order.items.map((i: any) =>
                i.id === item.id ? { ...i, quantity: newQuantity } : i
              ),
            };
          }
          return order;
        });

        setCart(updatedCart);

        // toast.success(`${item.product_name} quantity updated successfully!`, {
        //   position: "top-left",
        //   autoClose: 2000,
        //   theme: "light",
        // });
      })
      .catch((error) => {
        console.error("Error updating item quantity:", error);
        toast.error("Error updating item quantity");
      });
  };

  return (
    <div
      className="fixed top-0 h-screen right-0 bg-[white] w-[400px] z-500000 px-[2rem] max-[700px]:w-full border-l-1"
      style={{
        right: props.isOpenCartMenu ? "0" : "-100%",
        transition: "all 500ms",
      }}
    >
      <div className="flex justify-between items-center p-2.5 mt-6">
        <span className="font-[700] text-[14px] uppercase">
          YOU HAVE {pendingCartItems[0]?.items?.length} ITEM{" "}
          {pendingCartItems[0]?.items?.length > 0 ? "S" : ""} IN YOUR CART
        </span>
        <IoClose
          className="border cursor-pointer text-2xl rounded-[4px]"
          onClick={() => props.setIsOpenCartMenu(false)}
        />
      </div>

      <div className="overflow-y-auto h-[80%]">
        {/* Static item */}
        {pendingCartItems[0]?.items?.map((item: OrderItem, idx: number) => (
          <div
            key={item.id || idx}
            className="flex items-center justify-between bg-[#F3F3F3] border-1 my-2"
          >
            <img
              src={`http://localhost:3000/uploads/${item.image_url}` || img}
              className="w-[100px]"
              alt={item.product_name || "Product"}
            />
            <div className="flex flex-col items-end gap-2 p-2 text-[13px]">
              <div className="flex items-center gap-1">
                <button
                  className="w-6 h-6 flex cursor items-center justify-center border border-gray-400 hover:bg-gray-200 transition duration-200 text-sm font-bold"
                  onClick={() => {
                    // Diminuisci quantità
                    const newQuantity = (item.quantity || 1) - 1;
                    if (newQuantity >= 1) {
                      axiosUpdateQuantity(item, newQuantity);
                    }
                  }}
                  disabled={(item.quantity || 1) <= 1}
                >
                  ▼
                </button>
                <span className="min-w-[20px] text-center font-medium">
                  {item.quantity || 1}
                </span>
                <button
                  className="w-6 h-6 flex cursor items-center justify-center border border-gray-400 hover:bg-gray-200 transition duration-200 text-sm font-bold"
                  onClick={() => {
                    // Aumenta quantità
                    const newQuantity = (item.quantity || 1) + 1;
                    axiosUpdateQuantity(item, newQuantity);
                  }}
                >
                  ▲
                </button>
              </div>
              <span>{item.product_name || "Item"}</span>
              <span>{item.price ? `${item.price} €` : "0 €"}</span>
              <button
                className="uppercase font-[700] cursor-pointer hover:text-[#C0BFBF] transition duration-500"
                onClick={() => {
                  axios
                    .delete(
                      `http://localhost:3000/api/order/product/${item.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then(() => {
                      // Trova l'ordine pending
                      const updatedCart = cart.map((order: any) => {
                        if (order.status === "pending") {
                          return {
                            ...order,
                            items: order.items.filter(
                              (i: any) => i.id !== item.id
                            ),
                          };
                        }
                        return order;
                      });

                      setCart(updatedCart);

                      toast.success(
                        `${item.product_name} deleted successfully!`,
                        {
                          position: "top-left",
                          autoClose: 2000,
                          theme: "light",
                        }
                      );
                    })
                    .catch((error) => {
                      console.error("Error deleting item:", error);
                      toast.error("Error deleting item");
                    });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {pendingCartItems[0]?.items?.length == 0 ? (
        <Link to="/shop" onClick={() => props.setIsOpenCartMenu(false)}>
          <button className="border-2 absolute w-[85%] top-17 border-[#000] p-2.5 uppercase font-[700] cursor-pointer hover:text-[#C0BFBF] hover:bg-black transition duration-200">
            CONTINUE SHOPPING
          </button>
        </Link>
      ) : (
        <button className="border-2 absolute w-[85%] bottom-2.5 border-[#000] p-2.5 uppercase font-[700] cursor-pointer hover:text-[#C0BFBF] hover:bg-black transition duration-200">
          {pendingCartItems[0]?.items?.reduce(
            (total, item: any) =>
              total + (item.price || 0) * (item.quantity || 1),
            0
          ) || 0}
          € <span>CHECKOUT</span>
        </button>
      )}
    </div>
  );
}
