import "./App.css";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import { Routes, Route } from "react-router-dom";
import SideBar from "./assets/components/SideBar";
import Order from "./assets/components/Dashboard/Order";
import Dashbord from "./assets/components/Dashboard/Dashbord";

function App() {
  return (
    <>
      <SideBar />
      <Dashbord/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
