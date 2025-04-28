import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashbord from "./components/Dashboard/Dashbord";
import Order from "./components/Order";
import SideBar from "./components/SideBar";
import Register from "./components/Register";
import Products from "./components/Products";
import Login from "./components/Login";
import Offers from "./components/Offers";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Home from "./components/Home";
import Shop from "./components/Shop";

function App() {
  const [section, setSection] = useState<string>("");
  const sectionHandler = () => {
    switch (section) {
      case "Dashboard":
        return <Dashbord />;
      case "Orders":
        return <Order />;
      case "Products":
        return <Products />;
      case "Offers":
        return <Offers />;
      // default:
      //   return <Dashbord />;
    }
  };

  return (
    <>
      {/* <SideBar section={section} setSection={setSection} />
      {sectionHandler()}  */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
