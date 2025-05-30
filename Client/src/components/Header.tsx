import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../VID-IMG/LOGO.png";
import logo2 from "../VID-IMG/LOGO2.png";
import Hamburger from "hamburger-react";
import { useContext, useState } from "react";
import Cart from "./Cart";
import { ToastContainer } from "react-toastify";
import { CartContext, Order } from "@/Contexts/CartContext";
export default function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenCartMenu, setIsOpenCartMenu] = useState<boolean>(false);
  const location = useLocation();
  const isBlackTextHeader =
    location.pathname.toLocaleLowerCase().includes("shop") ||
    isOpen ||
    location.pathname.toLocaleLowerCase().includes("product") ||
    location.pathname.toLocaleLowerCase().includes("profile") ||
    location.pathname.toLocaleLowerCase().includes("checkout");
  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
  ];
  const navigate = useNavigate();
  const img = isBlackTextHeader ? logo2 : logo;
  const isRelative =
    location.pathname.toLocaleLowerCase().includes("shop") ||
    location.pathname.toLocaleLowerCase().includes("product") ||
    location.pathname.toLocaleLowerCase().includes("profile") ||
    location.pathname.toLocaleLowerCase().includes("checkout");

  const logOut = () => {
    setOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  const { cart } = context;
  const pendingCartItems: Order[] = cart.filter(
    (item: Order) => item.status === "pending"
  );

  const isCheckoutPage = location.pathname
    .toLocaleLowerCase()
    .includes("checkout");
  return (
    <>
      <ToastContainer />
      <Cart
        isOpenCartMenu={isOpenCartMenu}
        setIsOpenCartMenu={setIsOpenCartMenu}
      />
      <div
        style={{
          fontSize: "clamp(1rem, 1vw, 2rem)",
        }}
        className={` z-2 flex ${
          isRelative ? "relative" : "absolute"
        }  w-[100%] font-['Josefin_Sans'] max-[992px]:p-4  items-center justify-between p-7 px-11 ${
          isBlackTextHeader ? "text-black" : "text-white"
        }`}
      >
        <Link to="/">
          <img
            src={img}
            alt="Logo Volution Wear"
            loading="lazy"
            className="max-w-[200px]"
          />
        </Link>
        <div
          className={`flex duration-500  items-center ${
            isOpen ? "max-[992px]:right-0" : "max-[992px]:right-[110%]"
          } text-white max-[992px]:text-black grow-1 max-[992px]:items-center max-[992px]:justify-normal i  justify-between max-[992px]:absolute max-[992px]:w-[100%] max-[992px]:right-0  max-[992px]:flex-col max-[992px]:top-0 max-[992px]:h-[100vh]  max-[992px]:bg-amber-50`}
        >
          <ul className=" flex  gap-5 relative left-1/2 max-[992px]:top-1/10 items-center -translate-x-[80%] max-[992px]:translate-x-0 max-[992px]:left-0 max-[992px]:flex-col">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={`transition duration-200 hover:text-[#adb5bd] cursor-pointer ${
                  isBlackTextHeader ? "text-black" : "text-white"
                }`}
              >
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          {!localStorage.getItem("token") ? (
            <div className="flex gap-5 relative top-1/8 max-[992px]:flex-col   items-center ">
              <Link to="/Register">
                <button
                  className={`cursor-pointer transition duration-200 hover:text-[#adb5bd] ${
                    isBlackTextHeader ? "text-black" : "text-white"
                  }`}
                >
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button
                  className={`cursor-pointer transition duration-200 hover:text-[#adb5bd] ${
                    isBlackTextHeader ? "text-black" : "text-white"
                  }`}
                >
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <div  className="flex gap-5 relative top-1/8 max-[992px]:flex-col   items-center ">
              <Link to="/profile">
                <button
                  className={`cursor-pointer transition duration-200 hover:text-[#adb5bd] ${
                    isBlackTextHeader ? "text-black" : "text-white"
                  } ${
                    location.pathname.toLocaleLowerCase().includes("profile")
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Profile
                </button>
              </Link>

              <button
                onClick={logOut}
                className={`cursor-pointer transition duration-200 hover:text-[#adb5bd] ${
                  isBlackTextHeader ? "text-black" : "text-white"
                }`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 ml-2 ">
          <div
            style={{
              display: isCheckoutPage ? "none" : "flex",
            }}
            onClick={() => {
              setIsOpenCartMenu(!isOpenCartMenu);
            }}
            className={`h-[30px] w-[30px] border-2 ${
              isBlackTextHeader ? "text-black" : "text-white"
            } ${
              isBlackTextHeader ? "border-black" : "border-white"
            } flex justify-center items-center pt-1 cursor-pointer rounded-[8px] `}
          >
            {pendingCartItems[0]?.items?.length || 0}
          </div>
          <div
            onClick={() => {
              setOpen(!isOpen);
            }}
            className="hidden max-[992px]:block"
          >
            <Hamburger
              color={`${isOpen || isBlackTextHeader ? "#000" : "#fff"}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
