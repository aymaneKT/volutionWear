import { OrderInfoItemType } from "./OrderDetails";

export default function OrderItemInfo(props: OrderInfoItemType) {
  return (
    <div className="flex items-center gap-2 border border-[#cecece] rounded-[4px] p-4">
      <div className="bg-[#F5F5F5] rounded-full h-[50px] self-start flex justify-center items-center w-[50px]">
        {props.sectionIcon}
      </div>
      <div>
        <h2 className="font-bold">{props.sectionTitle}</h2>
        {props.labelOne && (
          <p className="text-gray-400 font-medium text-sm">
            {props.labelOne}:{" "}
            <span className="text-black font-normal">{props.valueOne}</span>
          </p>
        )}
        {props.labelTwo && (
          <p className="text-gray-400 font-medium text-sm">
            {props.labelTwo}:{" "}
            <span
              style={{
                fontSize: "clamp(0.4rem, 3vw, 0.7rem)",
              }}
              className="text-black font-normal"
            >
              {props.valueTwo}
            </span>
          </p>
        )}
        {props.labelThree && (
          <p className="text-gray-400 font-medium text-sm">
            {props.labelThree}:{" "}
            <span className="text-black font-normal">{props.valueThree}</span>
          </p>
        )}
      </div>
    </div>
  );
}
