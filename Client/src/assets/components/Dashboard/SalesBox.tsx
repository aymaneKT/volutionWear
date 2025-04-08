type PropsSalesBox = {
  icon: React.ReactNode;
  sales: number;
  title: string;
};

export default function SalesBox(props: PropsSalesBox) {
  return (
    <div className="flex items-center justify-around border border-[#bcbcbc] rounded-[4px] p-4 ">
      {props.icon}
      <div className="flex flex-col gap-2">
        <span className="text-[35px] text-left font-bold"> {props.sales} </span>
        <h3 className="font-mono text-[18px] uppercase">{props.title}</h3>
      </div>
    </div>
  );
}
