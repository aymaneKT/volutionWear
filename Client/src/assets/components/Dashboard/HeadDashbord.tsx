import { IoIosSearch } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import img from "../../../VolutionWear.png";
type PropsHeadDash = {
  // Define any props you need here
  title: string;
  subtitle: string;
};
export default function HeadDashbord(props: PropsHeadDash) {
  return (
    <div className="flex items-center  justify-between bg  py-2">
      <div className="mt-4 flex flex-col">
        <h2 className="font-bold text-[18px] uppercase">{props.title}</h2>
        <span className="text-[12px] my-0"> {props.subtitle} </span>
      </div>
      <div className="flex items-center  gap-2">
        <div className="relative">
          <CiMail className="cursor-pointer bg-[#e9e4e45d] rounded-[4px] h-[35px] w-[40px] p-[5px]" />
          <div className="h-[15px] w-[15px] bg-red-500 absolute -top-1 -right-[2px] rounded-full flex justify-center items-center text-white text-[8px]">
            2
          </div>
        </div>
        <IoIosSearch className="cursor-pointer bg-[#e9e4e45d] rounded-[4px] h-[35px] w-[40px] p-[5px]" />
        <img
          src={img}
          className="h-[30px]
          border-2
          w-[30px] rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
