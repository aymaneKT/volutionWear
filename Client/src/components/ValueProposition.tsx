import img from "../VID-IMG/pexels-blitzboy-1040945.jpg";
import { FaTshirt } from "react-icons/fa";
import { MdCheckroom } from "react-icons/md";
import { RiShirtLine } from "react-icons/ri";
import { GiAmpleDress } from "react-icons/gi";

export default function ValueProposition() {
  const Values = [
    {
      icon: FaTshirt,
      title: "Global Creativity, Local Impact",
      description: "Find items from around the world, made for you.",
    },
    {
      icon: MdCheckroom,
      title: " Truly Unique Products",
      description: "No mass production, just exclusive pieces made with care.",
    },
    {
      icon: RiShirtLine,
      title: " Direct Connection with Sellers",
      description: "Customize your order or ask questions anytime.",
    },
    {
      icon: GiAmpleDress,
      title: "Ethical & Personal Shopping",
      description: "Shop consciously, gift with meaning.",
    },
  ].map((e, i) => (
    <div key={i} className="flex flex-col gap-3  items-center p-2">
      <e.icon className="text-6xl p-4 border-[#c6ab8ba5 ] border-1 border-[#79443B] rounded-full text-[#79443B]" />
      <h3  style={{
          fontSize: "clamp(1rem, 0.8vw, 2rem)",
        }} className="font-bold">{e.title}</h3>
      <p style={{
          fontSize: "clamp(1rem, 0.8vw, 2rem)",
        }} className="font-[Josefin_Sans] text-center">{e.description}</p>
    </div>
  ));

  return (
    <div className="my-[100px] px-10">
      {" "}
      <h1
        className="font-bold font-['Josefin_Sans'] mb-20 text-center"
        style={{
          fontSize: "clamp(2rem, 2vw, 3rem)",
        }}
      >
        Made with Heart, Worn with Style
      </h1>
      <div className="flex  flex-wrap-reverse justify-evenly items-center gap-y-20 gap-x-8">
          {/* left part */}
        <div>
          <img
            src={img}
            className="w-[550px] max-w-[100%]   object-center object-cover shadow-[20px_-20px_0px_10px_#c6ab8ba5]"
            loading="lazy"
          />
        </div>

        {/* right part */}
        <div className="flex flex-col items gap-6">
          <p className="font-[Josefin_Sans] text-center">
            Discover a marketplace where creativity meets individuality.
            <br /> Volution Wear connects you with passionate sellers offering
            handmade, vintage, and one-of-a-kind items <br />
            that can't be found anywhere else.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-4">
            {Values}
          </div>
        </div>
      </div>
    </div>
  );
}
