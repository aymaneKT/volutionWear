import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiCoatHangerBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import Input from "./Button";

type UserType = {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  isSeller: boolean;
  imageProfile: string;
};

export default function Register() {
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    isSeller: false,
    imageProfile: "",
  });
  return (
    <div className="flex bg-[#F8F8F8] ">
      {/* COLONNA SINISTRA - FORM */}
      <div className=" flex   flex-col h-screen font-[Inter] min-[993px]:min-w-[500px] max-[480px]:h-auto max-[480px]:py-4   justify-center grow-1  items-center max-w-[100%]  max-[992px]:w-[100%]  max-[992px]:px-12 max-[480px]:px-0">
        <h1
          style={{ fontSize: "clamp(1.8rem, 3vw, 2rem" }}
          className="font-medium"
        >
          CREATE ACCOUNT
        </h1>
        <p className="text-[#A6A6A7] mb-5">Sign up and start your journey</p>

        <div className="self-center flex flex-col gap-1 w-[100%] px-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              className="border-1 outline-0 pl-2.5 p-2 rounded-[4px] border-[#E3E6E9] mb-2"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              className="border-1 outline-0 pl-2.5 p-2 rounded-[4px] border-[#E3E6E9] mb-2"
            />
          </div>

          {/* Surname */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="surname" className="font-medium">
              Surname
            </label>
            <input
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
              value={user.surname}
              type="text"
              id="surname"
              placeholder="Enter your surname"
              required
              className="border-1 outline-0 pl-2.5 p-2 rounded-[4px] border-[#E3E6E9] mb-2"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="border-1 outline-0 pl-2.5 p-2 rounded-[4px] border-[#E3E6E9] mb-2"
            />
          </div>

          {/* Password con occhio */}
          <div className="flex flex-col mb-5 gap-1.5 relative">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <div className="flex items-center border-1">
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                className="border-1 outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9]"
              />
              <div
                className="cursor-pointer rounded-[4px] border-1 rounded-tl-0 rounded-bl-0 h-[100%] px-3 border-[#E3E6E9] flex items-center"
                onClick={() => setPasswordVisibility(!isPasswordVisible)}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <Input />
          {/* Seller toggle */}
          <div className="flex items-center gap-2 my-1">
            <p>Register as a seller?</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.isSeller}
                onChange={() => setUser({ ...user, isSeller: !user.isSeller })}
                className="sr-only peer"
              />
              <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 peer-checked:after:translate-x-8 peer-hover:after:scale-95" />
            </label>
          </div>

          {/* Register Button */}
          <button className="bg-gradient-to-r from-purple-300 to-purple-700 text-white py-3 rounded-[8px] cursor-pointer transition-colors transition-200">
            Register
          </button>
        </div>

        {/* Bottom */}
        <p className="text-center absolute -bottom-5  max-[992px]:relative max-[992px]:my-2">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#5805E9] cursor-pointer">Log in</span>
          </Link>
        </p>
      </div>

      {/* COLONNA DESTRA */}
      <div className="max-[992px]:hidden bg-[#B074F3]  grow flex flex-col justify-around py-8 items-center">
        <h1
          style={{ fontSize: "clamp(1rem, vw, 2rem)" }}
          className="text-center text-white text-[1rem] p-6 font-bold uppercase"
        >
          #withVolutionwear
          <br />
          Buy, sell, and discover unique fashion - sustainably. <br />
          Join the movement and refresh your wardrobe, one piece at a time.{" "}
          <br />
          Trusted by thousands | Zero fees | Always in style
        </h1>
        <PiCoatHangerBold className="text-white text-[20rem] rotate-12" />
        <p className="text-white text-5xl mt-2.5">Volution Wear</p>
      </div>
    </div>
  );
}
