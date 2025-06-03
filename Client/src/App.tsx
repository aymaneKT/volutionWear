import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductPage from "./components/ProductPage";
import NotFoundPage from "./components/NotFoundPage";
import { useEffect } from "react";
import checkTokenExpiration from "./MidFunction";
import ProfileChecker from "./components/ProfileChecker";
import CheckoutPage from "./components/CheckoutPage";
import AboutPage from "./components/AboutPage";
import Categories from "./components/Categories";

function App() {
  useEffect(() => {
    checkTokenExpiration();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileChecker />} />
        <Route path="/shop/product/:id" element={<ProductPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
