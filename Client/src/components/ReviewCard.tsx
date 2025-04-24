import { FaQuoteRight } from "react-icons/fa";
export default function ReviewCard({
  image,
  name,
  text,
}: {
  image: string;
  name: string;
  text: string;
}) {
  return (
    <article className="bg-white border-1 overflow-hidden  text-center px-8 py-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 max-w-md mx-auto">
      <div className="relative w-36 h-36 rounded-full mx-auto mb-6 before:content-[''] before:absolute before:w-full before:h-full before:bg-[#DAC9B4] before:-top-1 before:-right-2 before:rounded-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full relative z-10"
        />
        <span className="absolute top-0 left-0 w-10 h-10 bg-[#DAC9B4] text-white rounded-full flex items-center justify-center translate-y-1/4">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="text-lg font-semibold mb-1 whitespace-nowrap">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-4">{text}</p>
    </article>
  );
}
