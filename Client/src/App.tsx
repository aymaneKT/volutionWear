import "./App.css";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import { Routes, Route } from "react-router-dom";
import SideBar from "./assets/components/SideBar";
import Order from "./assets/components/Dashboard/Order";
import Dashbord from "./assets/components/Dashboard/Dashbord";
import { useState } from "react";

function App() {
  const [section, setSection] = useState<string>("Dashboard");
  const sectionHandler = () => {
    switch (section) {
      case "Dashboard":
        return <Dashbord />;
      case "Orders":
        return <Order />;

      default:
        return <Dashbord />;
    }
  };
  return (
    <>
      {/* <SideBar section={section} setSection={setSection} />
      {sectionHandler()} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
