import { useContext, useEffect, useState } from "react";
import HeadDashbord from "./Dashboard/HeadDashbord";
import img from "../VID-IMG/No_picture_available.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DeleteAccountModal from "./DeleteAccountModal";
import { SectionContext } from "@/Contexts/SectionContext";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import axios from "axios";
import { Camera } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

interface JwtPayload extends BaseJwtPayload {
  id?: number;
}

type passwordVisibleType = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

type adminType = {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  image: string | File;
  phone: string;
  bio: string;
};
type passwordType = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};
export default function Profile() {
  const { setSection } = useContext(SectionContext);
  const [sectionPage, setSectionPage] = useState<string>("Profile");
  const [passwordVisible, setPasswordVisible] = useState<passwordVisibleType>({
    current: false,
    new: false,
    confirm: false,
  });
  const [password, setPassword] = useState<passwordType>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [admin, setAdmin] = useState<adminType>({
    id: 0,
    username: "",
    name: "",
    surname: "",
    email: "",
    image: "",
    phone: "",
    bio: "",
  });

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("username", admin.username);
    formData.append("name", admin.name);
    formData.append("surname", admin.surname);
    formData.append("phone", admin.phone);
    formData.append("email", admin.email);
    formData.append("bio", admin.bio);
    if (admin.image) {
      formData.append("avatar", admin.image);
    }
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .put(`http://localhost:3000/api/user`, formData, header)
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })

      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const updatePassword = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    if (password.new_password !== password.confirm_password) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    axios
      .patch(
        `http://localhost:3000/api/user/password`,
        {
          newPassword: password.new_password,
          oldPassword: password.current_password,
        },
        header
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setPassword({
          ...password,
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const token = localStorage.getItem("token");
  const getUser = async (id: number) => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((res) => {
        const { data } = res.data;

        setAdmin({
          id: data.id,
          username: data.username,
          name: data.nome,
          surname: data.cognome,
          email: data.email,
          image: data.image,
          phone: data.phone_number,
          bio: data.Bio,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      const decode = jwtDecode<JwtPayload>(token);
      const { id } = decode;
      if (id) getUser(id);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <DeleteAccountModal
        isOpen={isOpenDeleteModel}
        setIsOpen={setIsOpenDeleteModel}
      />
      <div className="w-[calc(100% - 180px)] px-6 ml-[180px] max-[900px]:w-[calc(100% - 90px)] max-[900px]:ml-[90px]">
        <div className="flex flex-wrap gap-4 mt-5">
          <div className="border-1 p-2 rounded-[8px] grow max-w-[200px] max-[900px]:max-w-full">
            <h2 className="font-bold uppercase px-2">Settings</h2>
            <ul className="my-3 text-[#BEBFBE]">
              <li
                onClick={() => setSectionPage("Profile")}
                className={`
      p-2 rounded-[8px] cursor-pointer 
      ${
        sectionPage === "Profile"
          ? "bg-[#9810FA] text-white"
          : "bg-white text-[#BEBFBE]"
      } 
     
    `}
              >
                Profile
              </li>
              <li
                onClick={() => setSectionPage("Password")}
                className={`
      p-2 rounded-[8px] cursor-pointer 
      ${
        sectionPage === "Password"
          ? "bg-[#9810FA] text-white"
          : "bg-white text-[#BEBFBE]"
      } 
     
    `}
              >
                Password
              </li>
            </ul>
          </div>

          <div className="rounded-[8px]   grow border-1 flex gap-5 items-end justify-between flex-wrap p-4 max-[480px]:justify-center">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="relative">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : !(admin.image == null || admin.image == "")
                      ? `http://localhost:3000/uploads/${admin.image}`
                      : img
                  }
                  alt="Profile"
                  className="w-[120px] rounded-[8px]"
                />

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer"
                >
                  <Camera size={16} />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    multiple={false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setImagePreview(URL.createObjectURL(file));
                        setAdmin({ ...admin, image: file });
                      }
                    }}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Full Name
                </label>
                <input
                  type="text"
                  className="mt-1 focus:bg-[#b348ff0e] block  border-b-1 border-gray-500 outline-none p-2"
                  placeholder="Your Full Name"
                  disabled
                  value={`${admin.name} ${admin.surname}`}
                />
              </div>
            </div>
            <div className="flex gap-2 self-end mr-4 ">
              <button
                onClick={() => {
                  setSection("Dashboard");
                }}
                className="cursor-pointer bg-[#7E7E7E] text-white rounded-[7px] px-4 py-1.5"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (sectionPage === "Password") {
                    updatePassword();
                  } else {
                    updateProfile();
                  }
                }}
                className="cursor-pointer text-white rounded-[7px] bg-purple-600 px-4 py-1.5"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {sectionPage === "Profile" && (
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
                value={admin.username}
                onChange={(e) => {
                  setAdmin({ ...admin, username: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="Name"
                value={admin.name}
                onChange={(e) => {
                  setAdmin({ ...admin, name: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surname
              </label>
              <input
                type="text"
                className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="Surname"
                value={admin.surname}
                onChange={(e) => {
                  setAdmin({ ...admin, surname: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                className="mt-1 focus:bg-[#b348ff0e] block w-full border-b-1 border-gray-500 outline-none p-2"
                placeholder="Phone"
                value={admin.phone}
                onChange={(e) => {
                  setAdmin({ ...admin, phone: e.target.value });
                }}
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
                value={admin.email}
                onChange={(e) => {
                  setAdmin({ ...admin, email: e.target.value });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                onChange={(e) => {
                  setAdmin({ ...admin, bio: e.target.value });
                }}
                value={admin.bio}
                name="bio"
                rows={4}
                className="mt-1 focus:bg-[#b348ff0e] block w-full border-1 rounded-[8px] border-[BEBFBE] outline-none p-2 resize-none"
                placeholder="Scrivi qualcosa su di te..."
              ></textarea>
            </div>
          </div>
        )}
        {/* Passwords */}
        {sectionPage === "Password" && (
          <div className="border-1 rounded-[8px] my-4 p-5 flex flex-col gap-4">
            <h2 className="text-[18px] font-bold">Change Password</h2>
            {/* current */}
            <div className="Password flex flex-col mb-5 gap-1.5 relative">
              <label htmlFor="password1" className="font-medium">
                Current password
              </label>
              <div className="flex items-center border-1 w-[100%]">
                <input
                  type={passwordVisible.current ? "text" : "password"}
                  id="password1"
                  placeholder="Enter current password"
                  required
                  value={password.current_password}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      current_password: e.target.value,
                    });
                  }}
                  className="border-1 outline-0 pl-2.5 border-r-0 max-[480px]:w-[80%] grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9] "
                />
                <div
                  className="cursor-pointer  rounded-[4px] justify-center  px-3  flex items-center"
                  onClick={() => {
                    setPasswordVisible({
                      ...passwordVisible,
                      current: !passwordVisible.current,
                    });
                  }}
                >
                  {passwordVisible.current ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {/* new */}
            <div className="Password flex flex-col mb-5 gap-1.5 relative">
              <label htmlFor="password2" className="font-medium">
                New password
              </label>
              <div className="flex items-center border-1 w-[100%]">
                <input
                  type={passwordVisible.new ? "text" : "password"}
                  id="password2"
                  value={password.new_password}
                  placeholder="Enter current password"
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      new_password: e.target.value,
                    });
                    console.log(password);
                  }}
                  required
                  className="border-1 max-[480px]:w-[80%] outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9] "
                />
                <div
                  className="cursor-pointer  rounded-[4px] justify-center  px-3  flex items-center"
                  onClick={() => {
                    setPasswordVisible({
                      ...passwordVisible,
                      new: !passwordVisible.new,
                    });
                  }}
                >
                  {passwordVisible.new ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {/* confirm */}
            <div className="Password flex flex-col mb-5 gap-1.5 relative">
              <label htmlFor="password3" className="font-medium">
                Confirm password
              </label>
              <div className="flex items-center border-1 w-[100%]">
                <input
                  type={passwordVisible.confirm ? "text" : "password"}
                  id="password3"
                  value={password.confirm_password}
                  placeholder="Enter current password"
                  required
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      confirm_password: e.target.value,
                    });
                  }}
                  className="border-1 max-[480px]:w-[80%] outline-0 pl-2.5 border-r-0 grow-2 p-2 rounded-[4px] rounded-tr-0 rounded-br-0 border-[#E3E6E9] "
                />
                <div
                  className="cursor-pointer  rounded-[4px] justify-center  px-3  flex items-center"
                  onClick={() => {
                    setPasswordVisible({
                      ...passwordVisible,
                      confirm: !passwordVisible.confirm,
                    });
                  }}
                >
                  {passwordVisible.confirm ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setIsOpenDeleteModel(true);
          }}
          className="cursor-pointer px-4 py-2 my-4 transition duration-150 hover:bg-red-400 bg-red-500 text-white rounded-[4px]"
        >
          Delete Account
        </button>
      </div>
    </>
  );
}
