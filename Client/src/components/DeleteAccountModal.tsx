type DeleteAccountModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function DeleteAccountModal({
  isOpen,
  setIsOpen,
}: DeleteAccountModalProps) {

  return (
    <div
      style={{
        opacity: isOpen ? "1" : "0",
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={() => setIsOpen(false)}
      className="absolute z-10 transition duration-300 font-[Poppins] top-0 bottom-0 right-0 left-0  bg-[#ffffffdc] flex justify-center items-center  "
    >
      <div
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-20px)",
          opacity: isOpen ? "1" : "0",
        }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col border-2 rounded-[8px] bg-white p-9 w-[90%] max-[992px]:w-screen m-5 gap-5 relative "
      >
        <h2 className="text-lg font-semibold text-gray-800">Delete Account</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <div className="flex gap-2 self-end mt-4">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="cursor-pointer bg-[#7E7E7E] text-white rounded-[7px] px-4 py-1.5"
          >
            Cancel
          </button>
          <button className="cursor-pointer text-white rounded-[7px] bg-red-600 px-4 py-1.5">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
