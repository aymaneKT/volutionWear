import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import { useEffect } from "react";
import img from "C:/Users/ayman/OneDrive/Desktop/img.jpg";

type CartProps = {
  isOpenCartMenu: boolean;
  setIsOpenCartMenu: (value: boolean) => void;
};

export default function Cart(props: CartProps) {
  useEffect(() => {
    props.isOpenCartMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [props.isOpenCartMenu]);

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
          YOU HAVE 1 ITEM IN YOUR CART
        </span>
        <IoClose
          className="border cursor-pointer text-2xl rounded-[4px]"
          onClick={() => props.setIsOpenCartMenu(false)}
        />
      </div>

      <div className="overflow-y-auto h-[80%]">
        {/* Static item */}
        <div className="flex items-center justify-between bg-[#F3F3F3] border-1 my-2">
          <img
            src={img}
            className="w-[100px]"
            alt="Product"
          />
          <div className="flex flex-col items-end gap-2 p-2 text-[13px]">
            <span>1</span>
            <span>Sample Item</span>
            <span>20 €</span>
            <button className="uppercase font-[700] cursor-pointer hover:text-[#C0BFBF] transition duration-500">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Checkout button */}
      <button className="border-2 absolute w-[85%] bottom-2.5 border-[#000] p-2.5 uppercase font-[700] cursor-pointer hover:text-[#C0BFBF] hover:bg-black transition duration-200">
        20 € <span>CHECKOUT</span>
      </button>

      {/* Continue shopping button */}
      <Link to="/shop" onClick={() => props.setIsOpenCartMenu(false)}>
        <button className="border-2 absolute w-[85%] top-17 border-[#000] p-2.5 uppercase font-[700] cursor-pointer hover:text-[#C0BFBF] hover:bg-black transition duration-200 hidden">
          CONTINUE SHOPPING
        </button>
      </Link>
    </div>
  );
}
