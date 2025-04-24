import logo from "../VID-IMG/LOGO.png";
import InputHomePage from "./InputHomePage";
export default function AppComingSoonSection() {
  return (
    <div className="bg-black   relative  flex justify-between items-center flex-col p-10 gap-5 ">
      <img src={logo} className="object-cover object-center" loading="lazy" />
      <h2 className="text-white mt-3 uppercase text-xl text-center font-['Josefin_Sans']">
        Join the VolutionWear Community
      </h2>
      <InputHomePage />
    </div>
  );
}
