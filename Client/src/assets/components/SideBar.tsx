import { MdOutlineDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";

export default function SideBar() {
  const listSideBar = [
    { name: "Dashboard", icon: <MdOutlineDashboard /> },
    { name: "Orders", icon: <FaShoppingCart /> },
    { name: "Statistics", icon: <FaChartBar /> },
    { name: "Products", icon: <LuPackage /> },
    { name: "Offer", icon: <MdOutlineLocalOffer /> },
  ];

  return (
    <div className="h-screen bg-[#EA454C] absolute left-0 top-0 w-[180px] overflow-hidden max-[900px]:w-[90px] py-2">
      <h2 className="text-center font-bold text-white font-[Poetsen One]  my-4  uppercase ">Volution Wear</h2>
      <ul className="flex flex-col gap-3 cursor-pointer mt-9 ">
        {listSideBar.map((e) => (
          <li  className="flex relative  font-light  items-center gap-2.5 ml-4 text-[17px] w-[100%] rounded-2xl  text-white hover:bg-white  hover:text-[#EA454C] transition duration-100  pl-3 py-2">
            {e.icon} <span className="max-[900px]:hidden">{e.name}</span>
            <div className="clippath absolute w-8 h-18 bg-white right-0"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
