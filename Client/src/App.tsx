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
import checkTokenExpiration from "./MidFunction";
import UserProfile from "./components/UserProfile";

function App() {
  useEffect(() => {
    checkTokenExpiration();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<SellerDashbord />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/shop/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
