import { Link } from "react-router-dom";
import logo from "../VID-IMG/LOGO.png";
import Hamburger from "hamburger-react";
import { useState } from "react";
export default function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div
      style={{
        fontSize: "clamp(1rem, 1vw, 2rem)",
      }}
      className=" z-2 flex absolute w-[100%] font-['Josefin_Sans'] max-[992px]:p-4  items-center justify-between p-7 px-11"
    >
      <Link to="/">
        <img src={logo} alt="Logo Volution Wear" className="max-w-[200px]" />
      </Link>
      <div
        className={`flex duration-500  items-center ${
          isOpen ? "max-[992px]:right-0" : "max-[992px]:right-[100%]"
        } text-white max-[992px]:text-black grow-1 max-[992px]:items-center max-[992px]:justify-normal i  justify-between max-[992px]:absolute max-[992px]:w-[100%] max-[992px]:right-0  max-[992px]:flex-col max-[992px]:top-0 max-[992px]:h-[100vh]  max-[992px]:bg-amber-50`}
      >
        <ul  className=" flex  gap-5 relative left-1/2 max-[992px]:top-1/10 items-center -translate-x-[80%] max-[992px]:translate-x-0 max-[992px]:left-0 max-[992px]:flex-col">
          <li className="transition duration-200 hover:text-[#adb5bd] cursor-pointer  ">
            Shop
          </li>
          <li className="transition duration-200 hover:text-[#adb5bd] cursor-pointer  ">
            Categories
          </li>
          <li className="transition duration-200 hover:text-[#adb5bd] cursor-pointer  ">
            About
          </li>
        </ul>
        <div className="flex gap-5 relative top-1/8 max-[992px]:flex-col   items-center">
          <button className="cursor-pointer transition duration-200 hover:text-[#adb5bd]">
            Register
          </button>
          <button className="cursor-pointer transition duration-200 hover:text-[#adb5bd]">
            Login
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          setOpen(!isOpen);
        }}
        className="hidden max-[992px]:block"
      >
        <Hamburger color={`${isOpen ? "#000" : "#fff"}`} />
      </div>
    </div>
  );
}
