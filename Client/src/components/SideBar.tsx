import { MdOutlineDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { LuPackage } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
type SideBarType = {
  section: string;
  setSection: (value: string) => void;
};

export default function SideBar(props: SideBarType) {
  const listSideBar = [
    { name: "Dashboard", icon: <MdOutlineDashboard /> },
    { name: "Orders", icon: <FaShoppingCart /> },
    // { name: "Statistics", icon: <FaChartBar /> },
    { name: "Products", icon: <LuPackage /> },
    { name: "Offers", icon: <MdOutlineLocalOffer /> },
  ];

  return (
    <div className="h-screen border-r-1 fixed left-0 top-0 w-[180px] overflow-hidden max-[900px]:w-[90px] py-2">
      <h2 className="text-center font- text-[#5805E9]   my-4  uppercase font-[Poppins]">
        Volution Wear
      </h2>
      <ul className="flex flex-col gap-8 cursor-pointer mt-9 ">
        {listSideBar.map((e) => (
          <li style={{
            background : e.name === props.section ? "#EEE6FD" : "",
            color : e.name === props.section ? "#5805E9" : ""
          }} onClick={()=>{props.setSection(e.name)}} className="group flex relative font-medium items-center gap-2.5 ml-4 text-[17px] w-[80%] rounded-xl text-[#7C7C7C] hover:bg-[#EEE6FD] hover:text-[#5805E9] transition duration-100 pl-3 py-2">
            {e.icon}
            <span className="max-[900px]:hidden">{e.name}</span>
            <div style={{
              display : e.name === props.section ? "block" : "none"
            }} className="absolute w-[4px] h-[100%] -left-[17px] bg-[#5805E9] hidden group-hover:block"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
