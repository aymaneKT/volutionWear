import { useEffect, useState } from "react";
import {
  User,
  Package,
  CreditCard,
  Edit,
  Camera,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import Header from "./Header";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import dfImage from "../VID-IMG/No_picture_available.png";

interface JwtPayload extends BaseJwtPayload {
  id?: number;
}
import axios from "axios";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";
import NotFoundPage from "./NotFoundPage";
type userType = {
  id: number;
  username: string;
  email: string;
  phone: string;
  surname: string;
  name: string;
  address: string;
  city: string;
  cap: string;
  country: string;
  image: string | File;
  password: string;
};
type passwordType = {
  currentPassword: string;
  newPassword: string;
  newPassword2: string;
};
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeOrderDetails, setActiveOrderDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [password, setPassword] = useState<passwordType>({
    currentPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const [user, setUser] = useState<userType>({
    id: 0,
    username: "",
    email: "",
    phone: "",
    surname: "",
    name: "",
    address: "",
    city: "",
    cap: "",
    country: "",
    image: "",
    password: password.newPassword,
  });

  const token = localStorage.getItem("token");

  const updateProfile = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("surname", user.surname);
    formData.append("name", user.name);
    formData.append("address", user.address);

    formData.append("city", user.city);
    formData.append("cap", user.cap);
    formData.append("country", user.country);
    if (user.image) formData.append("avatar", user.image);

    axios
      .put("http://localhost:3000/api/user", formData, header)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPassword({
          currentPassword: "",
          newPassword: "",
          newPassword2: "",
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
      })
      .finally(() => {
        setIsEditing(false);
      });
  };
  const updatePassword = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (password.newPassword !== password.newPassword2) {
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
        "http://localhost:3000/api/user/password",
        {
          newPassword: password.newPassword,
          oldPassword: password.currentPassword,
        },
        header
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPassword({
          currentPassword: "",
          newPassword: "",
          newPassword2: "",
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
  useEffect(() => {
    const getUser = (userId: number) => {
      setIsLoading(true);
      axios
        .get(`http://localhost:3000/api/user/${userId}`)
        .then((res) => {
          const user = res.data.data;
          setUser({
            ...user,
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone_number,
            surname: user.surname,
            name: user.name,
            image: user.image,
            address: user.address,
            city: user.city,
            cap: user.cap,
            country: user.country,
          });
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error !!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const { id } = decoded;
      if (id) getUser(id);
    }
  }, []);

  // Default orders
  const orders = [
    {
      id: 1001,
      date: "2025-04-28",
      status: "Consegnato",
      total: 129.99,
      products: [
        {
          id: 1,
          name: "Premium T-Shirt",
          price: 39.99,
          quantity: 2,
          image: "tshirt.jpg",
        },
        {
          id: 2,
          name: "Designer Jeans",
          price: 50.01,
          quantity: 1,
          image: "jeans.jpg",
        },
      ],
    },
    {
      id: 982,
      date: "2025-04-15",
      status: "In Elaborazione",
      total: 85.5,
      products: [
        {
          id: 3,
          name: "Sneakers",
          price: 85.5,
          quantity: 1,
          image: "sneakers.jpg",
        },
      ],
    },
  ];

  const toggleOrderDetails = (orderId: any) => {
    if (activeOrderDetails === orderId) {
      setActiveOrderDetails(null);
    } else {
      setActiveOrderDetails(orderId);
    }
  };

  const HundleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  return !token ? (
    <NotFoundPage />
  ) : (
    <>
      <ToastContainer />
      <Loader isLoading={isLoading} />
      <Header />
      <div className="px-4 md:px-8 lg:px-11 pb-16 bg-gray-50 min-h-screen">
        {/* Header placeholder */}
        <div className="py-4 mb-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">My Profile</h1>
        </div>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 mt-4">
          <a href="/">Home</a> /{" "}
          <span className="font-medium text-gray-800">Il Mio Profilo</span>
        </div>

        {/* Profile Section */}
        <div className="flex flex-wrap gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : !(user.image == null || user.image == "")
                      ? `http://localhost:3000/uploads/${user.image}`
                      : dfImage
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
                {isEditing && (
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setUser({ ...user, image: file });
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              <h2 className="font-bold text-xl mt-3">{user.username}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setActiveTab("profile")}
                className={`cursor-pointer flex items-center gap-3 w-full py-3 px-2 rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <User size={18} />
                <span>Personal Data</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`cursor-pointer flex items-center gap-3 w-full py-3 px-2 rounded-md transition-colors ${
                  activeTab === "orders"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <Package size={18} />
                <span>My Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`cursor-pointer flex items-center gap-3 w-full py-3 px-2 rounded-md transition-colors ${
                  activeTab === "password"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <CreditCard size={18} />
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Personal Information</h1>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex cursor-pointer items-center gap-2 bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-50"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateProfile();
                      }}
                      className="cursor-pointer flex items-center gap-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={user.username}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      pattern="^[0-9]{6,16}$"
                      maxLength={16}
                      minLength={6}
                      disabled={!isEditing}
                      required
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Surname
                    </label>
                    <input
                      type="text"
                      name="surname"
                      defaultValue={user.surname}
                      onChange={HundleInput}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={user.address}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      defaultValue={user.city}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CAP
                    </label>
                    <input
                      type="number"
                      name="cap"
                      maxLength={6}
                      defaultValue={user.cap}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      defaultValue={user.country}
                      disabled={!isEditing}
                      onChange={HundleInput}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <div>
                          <p className="font-medium">Ordine #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "Consegnato"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="font-medium">
                            €{order.total.toFixed(2)}
                          </span>
                          {activeOrderDetails === order.id ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>

                      {activeOrderDetails === order.id && (
                        <div className="border-t border-gray-200 p-4">
                          <h3 className="font-medium mb-3">
                            Products in the order
                          </h3>
                          <div className="space-y-3">
                            {order.products.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center gap-4"
                              >
                                <img
                                  src={dfImage}
                                  alt={product.name}
                                  className="w-16 h-16 object-center object-cover rounded border border-gray-200"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-600">
                                    Quantità: {product.quantity}
                                  </p>
                                </div>
                                <p className="font-medium">
                                  €{product.price.toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "password" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Change Password</h1>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={password.currentPassword}
                        onChange={(e) => {
                          setPassword({
                            ...password,
                            currentPassword: e.target.value,
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      value={password.newPassword}
                      type="password"
                      name="newPassword"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          newPassword: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={password.newPassword2}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          newPassword2: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <button
                    onClick={updatePassword}
                    type="button"
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
