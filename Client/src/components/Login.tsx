import { Link } from "react-router-dom";
import { PiCoatHangerBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
type UserType = {
  email: string;
  password: string;
};

export default function Login() {
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setPasswordVisibility] = useState<boolean>(false);
  return (
    <div className="flex h-screen bg-[#F8F8F8] font-[Inter]">
      <div className=" flex flex-col   justify-center grow-2   items-center w-[800px]  max-[992px]:px-12 max-[480px]:px-0">
        <h1
          style={{ fontSize: "clamp(2rem, 3vw, 0.8rem" }}
          className=" font-medium"
        >
          WELCOME BACK
        </h1>
        <p className="text-[#A6A6A7] mb-5">
          Welcome back! Please enter your details
        </p>

        <div className=" self-center flex flex-col gap-2 w-[100%] px-4 ">
          <div className="Email flex flex-col  gap-1.5">
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
          <div className="Password flex flex-col mb-5 gap-1.5 relative">
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
                className="border-1 outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9] "
              />
              <div
                className="cursor-pointer rounded-[4px] border-1 rounded-tl-0 rounded-bl-0 h-[100%]  px-3 border-[#E3E6E9] flex items-center"
                onClick={() => {
                  setPasswordVisibility(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between mb-5">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="accent-[#EA454C]"
                id="remember-me"
                onChange={(e) =>
                  setUser({ ...user, rememberMe: e.target.checked })
                }
                checked={user.rememberMe}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <span>Forgot password</span>
          </div> */}
          <button className="bg-gradient-to-r from-purple-300 to-purple-700  text-white py-3 rounded-[8px]   cursor-pointer transition-colors transition-200">
            Sign in
          </button>
        </div>
        <p className="text-center absolute bottom-4">
          Don't have an account ?{" "}
          <Link to="/register">
            <span className="text-[#5805E9] cursor-pointer">
              Sign up for free!
            </span>
          </Link>
        </p>
      </div>
      <div className="max-[992px]:hidden bg-[#B074F3]   flex flex-col py-8 items-center">
        <h1 className="text-center text-white text text-[1rem] p-6 font-bold uppercase">
          #withVolutionwear
          <br /> Buy, sell, and discover unique fashion - sustainably. Join the
          movement and refresh your wardrobe, one piece at a time. Trusted by
          thousands | Zero fees | Always in style
        </h1>
        <PiCoatHangerBold className="text-white text-[20rem] rotate-12" />
        <p className="text-white text-5xl mt-2.5 ">Volution Wear</p>
      </div>
    </div>
  );
}
