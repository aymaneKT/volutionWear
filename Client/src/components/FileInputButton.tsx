const FileInputButton = () => {
  return (
    <div className="flex items-center">
      <label
        htmlFor="fileInput"
        className="flex items-center gap-3 px-6 py-3 bg-[#C3A686] text-white text-xs font-bold uppercase rounded-lg shadow-md cursor-pointer transition-all duration-500 hover:shadow-lg active:opacity-80 active:shadow-none"
      >
        <svg
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            strokeWidth={2}
            stroke="#ffffff"
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="#ffffff"
            d="M17 15V18M17 21V18M17 18H14M17 18H20"
          />
        </svg>
        ADD IMAGE
      </label>
      <input type="file" id="fileInput" className="hidden" accept="image/*" />
    </div>
  );
};

export default FileInputButton;
