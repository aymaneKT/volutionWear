import { MdOutlineDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { useContext } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import { SectionContext } from "@/Contexts/SectionContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SideBar() {
  const { section, setSection } = useContext(SectionContext);
  const navigate = useNavigate();
  const listSideBar = [
    { name: "Dashboard", icon: <MdOutlineDashboard /> },
    { name: "Orders", icon: <FaShoppingCart /> },
    // { name: "Statistics", icon: <FaChartBar /> },
    { name: "Products", icon: <LuPackage /> },
    { name: "Offers", icon: <MdOutlineLocalOffer /> },
  ];

  return (
    <div className="h-screen border-r-1 fixed left-0 top-0 w-[180px] overflow-hidden max-[900px]:w-[90px] py-2">
      <p className="text-center text-[#5805E9] font-bold   my-4  uppercase font-[Poppins]">
        Volution Wear
      </p>
      <ul className="flex flex-col gap-8 cursor-pointer mt-9 ">
        {listSideBar.map((e, i) => (
          <li
            key={i}
            style={{
              background: e.name === section ? "#EEE6FD" : "",
              color: e.name === section ? "#5805E9" : "",
            }}
            onClick={() => {
              setSection(e.name);
            }}
            className="group flex relative font-medium items-center gap-2.5 ml-4 text-[17px] w-[80%] rounded-xl text-[#7C7C7C] hover:bg-[#EEE6FD] hover:text-[#5805E9] transition duration-100 pl-3 py-2"
          >
            {e.icon}
            <span className="max-[900px]:hidden font-[Poppins]">{e.name}</span>
            <div
              style={{
                display: e.name === section ? "block" : "none",
              }}
              className="absolute w-[4px] h-[100%] -left-[17px] bg-[#5805E9] hidden group-hover:block"
            ></div>
          </li>
        ))}
        <li
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Log Out Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            navigate("/login");
          }}
          className="flex absolute bottom-3  font-medium items-center gap-2.5 ml-4 text-[17px] w-[80%] rounded-xl text-[#7C7C7C] hover:bg-[#FDEAEA] hover:text-[#EB5757] transition duration-100 pl-3 py-2"
        >
          <MdOutlineLogin />
          <span className="max-[900px]:hidden font-[Poppins]">Log Out</span>
        </li>
      </ul>
    </div>
  );
}
