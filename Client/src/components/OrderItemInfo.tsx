import { orderItemInfoIterationType } from "./OrderDetails";

type props = orderItemInfoIterationType;
export default function OrderItemInfo({
  title,
  icon,
  first,
  second,
  third,
  isEditable,
}: props) {
  return (
    <div className="flex items-center  gap-2  border border-[#cecece] rounded-[4px] p-4 ">
      <div className="bg-[#F5F5F5] rounded-full h-[50px] self-start flex justify-center items-center w-[50px]">
        {icon}
      </div>
      {isEditable ? (
        <div>
          <h2 className="font-bold">{title}</h2>
          <textarea rows={4} className=" resize-none w-full border border-gray-300 rounded-md p-2" />
        </div>
      ) : (
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-gray-400">
            {first}: <span className="text-black">Aymane Kabti</span>
          </p>
          <p className="text-gray-400">
            {second}: <span className="text-black">aymanekabti@gmail.com</span>
          </p>
          <p className="text-gray-400">
            {third}: <span className="text-black">+39 351 868 6699</span>
          </p>
        </div>
      )}
    </div>
    
  );
}
