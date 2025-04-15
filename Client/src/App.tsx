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

function App() {
  const [section, setSection] = useState<string>("Products");
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
      default:
        return <Dashbord />;
    }
  };
  return (
    <>
      <SideBar section={section} setSection={setSection} />
      {sectionHandler()}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
