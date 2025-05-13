import { IoIosSearch } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import img from "../../VID-IMG/VolutionWear.png";
import { useContext, useEffect, useState } from "react";
import NotificationCard from "../NotificationCard";
import { SectionContext } from "@/Contexts/SectionContext";
import axios from "axios";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
type PropsHeadDash = {
  subtitle: string;
};
interface JwtPayload extends BaseJwtPayload {
  id?: number;
  is_seller?: boolean | string;
}
export default function HeadDashbord(props: PropsHeadDash) {
  const [isNotificationOpen, setNotificationOpen] = useState<boolean>(false);
  const { setSection } = useContext(SectionContext);
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState<string>("");
  const getUser = (id: Number) => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((res) => {
        const { data } = res.data;
        setUsername(data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      const decode = jwtDecode<JwtPayload>(token);
      const { id } = decode;
      if (id) getUser(id);
    }
  }, []);
  return (
    <>
      <NotificationCard
        isNotificationOpen={isNotificationOpen}
        setNotificationOpen={setNotificationOpen}
      />
      <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px] flex items-center  justify-between bg  py-2 ">
        <div className="mt-4 flex  flex-col">
          <h2 className="font-bold font-[Poppins] text-[17px] uppercase">
            HELLO {username}
          </h2>
          <span className="text-[12px] font-[Poppins] my-0">
            {" "}
            {props.subtitle}{" "}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="relative"
            onClick={() => {
              setNotificationOpen(true);
            }}
          >
            <CiMail className="cursor-pointer bg-[#e9e4e45d] rounded-[4px] h-[35px] w-[40px] p-[5px]" />
            <div className="h-[15px] w-[15px] bg-red-500 absolute -top-1 -right-[2px] rounded-full flex justify-center items-center text-white text-[8px]">
              2
            </div>
          </div>
          <IoIosSearch className="cursor-pointer bg-[#e9e4e45d] rounded-[4px] h-[35px] w-[40px] p-[5px]" />
          <img
            onClick={() => {
              setSection("Profile");
            }}
            src={img}
            className="h-[30px]
          w-[30px] rounded-full cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
