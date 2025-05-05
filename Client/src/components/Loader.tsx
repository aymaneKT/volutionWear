import Lottie from "lottie-react";
import animation from "../VID-IMG/Animation - 1745533424700.json";
import { useEffect } from "react";
type LoaderType = {
  isLoading: boolean;
};
export default function Loader({ isLoading }: LoaderType) {
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "visible";
  }, [isLoading]);

  return (
    <div
      className={`bg-[#ffffff] ${
        isLoading ? "fixed" : "hidden"
      } transition duration-600  flex justify-center items-center flex-col rounded-[4px] p-7 h-screen fixed  left-0 right-0 z-5 bottom-0 top-0`}
    >
      <Lottie animationData={animation} loop autoplay className="w-[150px]" />
      <h1 className="text-center font-[Josefin_Sans] text-2xl text-black">
        Loading...
      </h1>
    </div>
  );
}
