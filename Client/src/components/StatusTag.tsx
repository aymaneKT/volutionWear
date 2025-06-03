type StatusType = {
  status: string;
};

export default function StatusTag(props: StatusType) {
  const styles: Record<string, { bg: string; text: string }> = {
    Processing: {
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
    Completed: {
      bg: "bg-[#E5FFE5]",
      text: "text-[#27AE60]",
    },
  };

  // Default style fallback
  const style = styles[props.status] || {
    bg: "bg-gray-200",
    text: "text-gray-600",
  };

  return (
    <span
      className={`rounded-[4px] w-fit py-1 px-2 font-medium ${style.bg} ${style.text}`}
    >
      {props.status}
    </span>
  );
}
