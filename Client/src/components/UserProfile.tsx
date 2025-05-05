import { useState } from "react";
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

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Default user data
  const userData = {
    id: 1,
    username: "MarcoRossi",
    email: "marco.rossi@example.com",
    phone: "+39 123 456 7890",
    address: "Via Roma 123",
    city: "Milano",
    zipCode: "20100",
    country: "Italia",
    image: null,
  };

  // Default password fields
  const passwordData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

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

  const [activeOrderDetails, setActiveOrderDetails] = useState(null);

  const toggleOrderDetails = (orderId: any) => {
    if (activeOrderDetails === orderId) {
      setActiveOrderDetails(null);
    } else {
      setActiveOrderDetails(orderId);
    }
  };

  // Placeholder image
  const pp = "/api/placeholder/200/200";

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
            <p className="text-center mt-2">Caricamento...</p>
          </div>
        </div>
      )}
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
                  src={imagePreview || pp}
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
                    />
                  </label>
                )}
              </div>
              <h2 className="font-bold text-xl mt-3">{userData.username}</h2>
              <p className="text-gray-600 text-sm">{userData.email}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full py-3 px-2 rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <User size={18} />
                <span>Dati Personali</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 w-full py-3 px-2 rounded-md transition-colors ${
                  activeTab === "orders"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <Package size={18} />
                <span>I Miei Ordini</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex items-center gap-3 w-full py-3 px-2 rounded-md transition-colors ${
                  activeTab === "password"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
              >
                <CreditCard size={18} />
                <span>Cambia Password</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Dati Personali</h1>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-50"
                    >
                      <Edit size={16} />
                      <span>Modifica</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                    >
                      <Save size={16} />
                      <span>Salva</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Utente
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={userData.username}
                      disabled={!isEditing}
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
                      defaultValue={userData.email}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={userData.phone}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Indirizzo
                    </label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={userData.address}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Città
                    </label>
                    <input
                      type="text"
                      name="city"
                      defaultValue={userData.city}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CAP
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      defaultValue={userData.zipCode}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paese
                    </label>
                    <input
                      type="text"
                      name="country"
                      defaultValue={userData.country}
                      disabled={!isEditing}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">I Miei Ordini</h1>

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
                            Prodotti nell'ordine
                          </h3>
                          <div className="space-y-3">
                            {order.products.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center gap-4"
                              >
                                <img
                                  src={pp}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded border border-gray-200"
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
                <h1 className="text-2xl font-bold mb-6">Cambia Password</h1>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password Attuale
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
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
                      Nuova Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                  >
                    Salva Password
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
