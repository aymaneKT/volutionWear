import { Link } from "react-router-dom";
import img from "../../VolutionWear.png";
import { useState } from "react";
type UserType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function Login() {
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
    rememberMe: false,
  });
  return (
    <div className="flex h-screen">
      <div className="bg-[#F8F8F8] grow flex flex-col justify-center items-center min-[1120px]:w-[25%] ">
        <h1 className="text-4xl font-medium">WELCOME BACK</h1>
        <p className="text-[#A6A6A7] mb-5">
          Welcome back! Please enter your details
        </p>

        <div className=" self-center flex flex-col gap-5 w-[100%] px-4 ">
          <div className="Email flex flex-col mb-5 gap-1.5">
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
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7] mb-2"
            />
          </div>
          <div className="Password flex flex-col mb-5 gap-1.5">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7] mb-2"
            />
          </div>
          <div className="flex justify-between mb-5">
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
          </div>
          <button className="bg-[#EA454C] text-white py-2 rounded-md hover:bg-white hover:text-[#EA454C] hover:border-[#EA454C] hover:border-[2px] hover:cursor-pointer transition-colors transition-200">
            Sign in
          </button>
          <p className="text-center">
            Don't have an account ?{" "}
            <Link to="/register">
              <span className="text-[#EA454C] cursor-pointer">
                Sign up for free!
              </span>
            </Link>
          </p>
        </div>
      </div>
      <img src={img} alt="Logo Image" className=" max-[1110px]:hidden grow" />
    </div>
  );
}
