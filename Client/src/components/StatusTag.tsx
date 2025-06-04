type StatusType = {
  status: string;
};

export default function StatusTag(props: StatusType) {
  const styles: Record<string, { bg: string; text: string }> = {
    Shipped: {
      bg: "bg-[#E5F0FF]",
      text: "text-[#4285F4]",
    },

    Completed: {
      bg: "bg-green-100",
      text: "text-green-600",
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
