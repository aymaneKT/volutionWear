import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Shop from "./components/Shop";
import SellerDashbord from "./components/SellerDashbord";
import ProductPage from "./components/ProductPage";
import NotFoundPage from "./components/NotFoundPage";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  useEffect(() => {
    const isTokenExpired = (token: string): boolean => {
      try {
        const decoded: any = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        return Date.now() > expTime;
      } catch (error) {
        console.error("Error decoding the token:", error);
        return true;
      }
    };
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Token expired and removed from localStorage");
      }
    };
    checkTokenExpiration();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<SellerDashbord />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
