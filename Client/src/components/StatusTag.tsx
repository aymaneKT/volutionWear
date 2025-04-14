type statusType = {
  status: string;
};
export default function StatusTag(props: statusType) {
  const styles: Record<string, { bg: string; text: string }> = {
    Pending: {
      bg: "bg-[#FFF6E5]",
      text: "text-[#F5A623]",
    },
    Shipped: {
      bg: "bg-[#E5F0FF]",
      text: "text-[#4285F4]",
    },
    Delivered: {
      bg: "bg-[#E8FAF4]",
      text: "text-[#6DBFB3]",
    },
    Canceled: {
      bg: "bg-[#FDEAEA]",
      text: "text-[#EB5757]",
    },
  };

  return (
    <span
      className={`rounded-[4px] w-fit py-1 px-2 font-medium ${
        styles[props.status].bg
      } ${styles[props.status].text}`}
    >
      {props.status}
    </span>
  );
}
