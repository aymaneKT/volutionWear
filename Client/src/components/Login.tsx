import { Link } from "react-router-dom";
import { PiCoatHangerBold } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const login = () => {
    const id = toast.loading("Please wait...");
    axios
      .post("http://localhost:3000/api/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.update(id, {
          render: "Signin successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          if (res.data.user.is_seller) {
            navigate("/admin");
          } else {
            navigate("/shop");
          }
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);

        toast.update(id, {
          render: err.response.data.error,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen bg-[#F8F8F8]">
        <div className="flex flex-col justify-center grow-2 items-center w-[800px] max-[992px]:px-12 max-[480px]:px-0">
          <h1
            style={{ fontSize: "clamp(1.8rem, 3vw, 2rem)" }}
            className="font-medium"
          >
            WELCOME BACK
          </h1>
          <p className="text-[#A6A6A7] mb-5">
            Welcome back! Please enter your details
          </p>

          <div
            className="self-center flex flex-col gap-2 w-[100%] px-4"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <div className="Email flex flex-col gap-1.5">
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="border-1 outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9]"
                />
                <div
                  className="cursor-pointer rounded-[4px] border-1 rounded-tl-0 rounded-bl-0 h-[100%] px-3 border-[#E3E6E9] flex items-center"
                  onClick={() => {
                    setPasswordVisibility(!isPasswordVisible);
                  }}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              onClick={login}
              className="bg-gradient-to-r from-[#E3DAC9] to-[#C3A686] hover:from-[#d6cdbd] hover:to-[#b89e7c] text-white py-3 rounded-[8px] cursor-pointer transition-colors duration-300"
            >
              Sign in
            </button>
          </div>

          <p className="text-center absolute bottom-4">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-[#C3A686] font-medium cursor-pointer">
                Sign up for free!
              </span>
            </Link>
          </p>
        </div>

        <div className="max-[992px]:hidden bg-[#A68B71] flex flex-col justify-around py-8 items-center">
          <h1 className="text-center text-white text-[1rem] p-6 font-bold uppercase">
            #withVolutionwear
            <br /> Buy, sell, and discover unique fashion - sustainably. Join
            the movement and refresh your wardrobe, one piece at a time. Trusted
            by thousands | Zero fees | Always in style
          </h1>
          <PiCoatHangerBold className="text-white text-[20rem] rotate-12" />
          <p className="text-white text-5xl mt-2.5">Volution Wear</p>
        </div>
      </div>
    </>
  );
}
