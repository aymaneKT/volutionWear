import { useState, useContext, useEffect } from "react";
import { FaCreditCard, FaPaypal, FaApplePay, FaGoogle } from "react-icons/fa";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext, Order, OrderItem } from "@/Contexts/CartContext";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";

const CheckoutPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  const { cart, setCart } = context;
  const subtotal =
    order?.items.reduce(
      (acc, item: OrderItem) => acc + Number(item.price) * item.quantity,
      0
    ) || 0;
  const tax = (subtotal ?? 0) * 0.1;
  const shipping = 15.99;
  const total = (subtotal ?? 0) + tax + shipping;

  //   const handleCouponSubmit = (e) => {
  //     e.preventDefault();
  //     if (couponCode === "SAVE20") {
  //       setCouponError("Coupon applied successfully!");
  //     } else {
  //       setCouponError("Invalid coupon code");
  //     }
  //   };

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const axiosGetOrderForCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      navigate("/login");
      return;
    }
    // const decoded = jwtDecode<JwtPayload>(token);
    // const { id } = decoded;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://localhost:3000/api/orders", headers)
      .then((response) => {
        const order = response.data.orders;
        const pandingOrder = order.find(
          (order: Order) => order.status === "pending"
        );
        setOrder(pandingOrder);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    axiosGetOrderForCheckout();
  }, [navigate]);

  const handleCheckout = (e: React.FormEvent) => {
    if (
      !formData.cardNumber ||
      !formData.cardName ||
      !formData.expiry ||
      !formData.cvv
    ) {
      toast.error("Please fill in all credit card details.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      navigate("/login");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:3000/api/order/checkout", {}, config)
      .then((response) => {
        console.log("Checkout successful:", response.data);
        const pendingOrder = cart.find(
          (order: Order) => order.status === "pending"
        );
        if (pendingOrder) {
          setCart((prevCart: Order[]) =>
            prevCart.map((order) =>
              order.status === "pending"
                ? { ...order, status: "completed" }
                : order
            )
          );
        }
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/shop");
      })

      .catch((error) => {
        console.error("Error during checkout:", error);
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <>
      <Header />
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {order?.items?.map((product: OrderItem) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 border-b pb-4"
                  >
                    <img
                      src={"http://localhost:3000/uploads/" + product.image_url}
                      alt={product.product_name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.product_name}</h3>
                      <p className="text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-gray-800">
                        {Number(product.price).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{tax.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

              {/* Coupon Section */}
              {/* <div className="mb-8">
                <form className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Apply
                  </button>
                </form>
                {couponError && (
                  <p
                    className={`mt-2 text-sm ${
                      couponError.includes("Invalid")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {couponError}
                  </p>
                )}
              </div> */}

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "credit-card",
                      icon: FaCreditCard,
                      label: "Credit Card",
                    },
                    { id: "paypal", icon: FaPaypal, label: "PayPal" },
                    { id: "apple-pay", icon: FaApplePay, label: "Apple Pay" },
                    { id: "google-pay", icon: FaGoogle, label: "Google Pay" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 border cursor-pointer rounded-lg flex items-center justify-center space-x-2 transition-colors
                      ${
                        selectedPayment === method.id
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <method.icon className="text-xl" />
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              {selectedPayment === "credit-card" && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiry"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YY"
                        required
                        pattern="\d{2}/\d{2}"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full cursor-pointer py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-6"
                  >
                    Pay {total.toFixed(2)} €
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
