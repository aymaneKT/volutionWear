import { useState } from "react";
import img from "../VolutionWear.png";
import { Link } from "react-router-dom";

type UserType = {
  username: string;
  name: string;
  surname: string;
  email:string;
  password: string;
  isSeller: boolean;
};

export default function Register() {
  const [user, setUser] = useState<UserType>({
    username: "",
    name: "",
    surname: "",
    email:"",
    password: "",
    isSeller: false,
  });
  return (
    <div className="flex  h-screen">
      <div className="bg-[#F8F8F8] grow flex flex-col py-2 justify-center items-center min-[1120px]:w-[25%]">
        <h1 className="text-4xl font-medium py-1 mt-5">CREATE ACCOUNT</h1>
        <p className="text-[#A6A6A7] mb-3">Sign up and start your journey</p>

        <div className="self-center flex flex-col  w-[100%] px-4">
          <div className="Username flex flex-col mb-1.5 gap-1.5">
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
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7]"
            />
          </div>
          <div className="Name flex flex-col mb-1.5 gap-1.5">
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
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7]"
            />
          </div>
          <div className="Surname flex flex-col mb-1.5 gap-1.5">
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
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7]"
            />
          </div>
          <div className="Surname flex flex-col mb-1.5 gap-1.5">
            <label htmlFor="surname" className="font-medium">
              Email
            </label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="text"
              id="surname"
              placeholder="Enter your surname"
              required
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7]"
            />
          </div>
          <div className="Password flex flex-col mb-1.5 gap-1.5">
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
              className="border-1 outline-0 pl-2.5 p-2 rounded-[8px] border-[#A6A6A7]"
            />
          </div>
          <div className="flex items-center gap-2 my-2">
            <p>Register as a seller ?</p>{" "}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.isSeller}
                onChange={() => {
                  setUser({ ...user, isSeller: !user.isSeller });
                }}
                className="sr-only peer"
              />
              <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95" />
            </label>
          </div>
          <button className="bg-[#5805E9] text-white py-2 my-2 rounded-md hover:bg-[#EEE6FD] hover:text-[#5805E9] hover:border-[#5805E9] hover:border-[2px] hover:cursor-pointer transition-all transition-200">
            Register
          </button>
          <p className="text-center pb-4 ">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#5805E9] cursor-pointer">Log in</span>
            </Link>
          </p>
        </div>
      </div>
      <img src={img} alt="Logo Image" className="max-[1110px]:hidden grow" />
    </div>
  );
}
