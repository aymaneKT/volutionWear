import { useEffect, useState } from "react";
import HeadDashbord from "./Dashboard/HeadDashbord";
import img from "../VolutionWear.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [time, setTime] = useState("");
  useEffect(() => {
    setInterval(() => {
      let nwDate = new Date().toLocaleString() + "";
      setTime(nwDate);
    }, 1000);
  }, []);
  return (
    <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
      <HeadDashbord title="Welcome, Aymane" subtitle={time} />

      <div className="flex flex-wrap gap-4 mt-5">
        <div className="border-1 p-2 rounded-[8px] grow max-w-[200px] max-[900px]:max-w-full">
          <h2 className="font-bold uppercase px-2">Settings</h2>
          <ul className="my-3 text-[#BEBFBE]">
            <li className="p-2 hover:bg-[#9810FA] rounded-[8px] hover:text-white cursor-pointer">
              Profile
            </li>
            <li className="p-2 hover:bg-[#9810FA] rounded-[8px] hover:text-white cursor-pointer">
              Password
            </li>
          </ul>
        </div>

        <div className="rounded-[8px]   grow border-1 flex gap-5 items-end justify-between flex-wrap p-4 max-[480px]:justify-center">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <img src={img} className="  w-[120px] rounded-[8px]" />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Full Name
              </label>
              <input
                type="text"
                className="mt-1 focus:bg-[#b348ff0e] block  border-b-1 border-gray-500 outline-none p-2"
                placeholder="Your Full Name"
              />
            </div>
          </div>
          <div className="flex gap-2 self-end mr-4 ">
            <button className="cursor-pointer bg-[#7E7E7E] text-white rounded-[7px] px-4 py-1.5">
              Cancel
            </button>
            <button className="cursor-pointer text-white rounded-[7px] bg-purple-600 px-4 py-1.5">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="border-1 rounded-[8px] my-4 p-5 flex flex-col gap-4">
        <h2 className="text-[18px] font-bold">Profile</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="Cognome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            rows={4}
            className="mt-1 focus:bg-[#b348ff0e] block w-full border-1 rounded-[8px] border-[BEBFBE] outline-none p-2 resize-none"
            placeholder="Scrivi qualcosa su di te..."
          ></textarea>
        </div>
      </div>
      <div className="border-1 rounded-[8px] my-4 p-5 flex flex-col gap-4">
        <h2 className="text-[18px] font-bold">Change Password</h2>

        {/* Current Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="current-password" className="font-medium">
            Current Password
          </label>
          <div className="flex items-center border-1">
            <input
              type={passwordVisible.current ? "text" : "password"}
              id="current-password"
              placeholder="Enter your current password"
              required
              className="border-1 outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9]"
            />
            <div
              className="cursor-pointer rounded-[4px] border-1 rounded-tl-0 rounded-bl-0 h-[100%] px-3 border-[#E3E6E9] flex items-center"
              onClick={() =>
                setPasswordVisible({
                  ...passwordVisible,
                  current: !passwordVisible.current,
                })
              }
            >
              {passwordVisible.current ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="new-password" className="font-medium">
            New Password
          </label>
          <div className="flex items-center border-1">
            <input
              type={passwordVisible.new ? "text" : "password"}
              id="new-password"
              placeholder="Enter a new password"
              required
              className="border-1 outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9]"
            />
            <div
              className="cursor-pointer rounded-[4px] border-1 rounded-tl-0 rounded-bl-0 h-[100%] px-3 border-[#E3E6E9] flex items-center"
              onClick={() =>
                setPasswordVisible({
                  ...passwordVisible,
                  new: !passwordVisible.new,
                })
              }
            >
              {passwordVisible.new ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirm-password" className="font-medium">
            Confirm New Password
          </label>
          <div className="flex items-center border-1">
            <input
              type={passwordVisible.confirm ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your new password"
              required
              className="border-1 outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9]"
            />
            <div
              className="cursor-pointer rounded-[4px] border-1 rounded-tl-0 rounded-bl-0 h-[100%] px-3 border-[#E3E6E9] flex items-center"
              onClick={() =>
                setPasswordVisible({
                  ...passwordVisible,
                  confirm: !passwordVisible.confirm,
                })
              }
            >
              {passwordVisible.confirm ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
