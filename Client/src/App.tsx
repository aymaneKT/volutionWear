import "./App.css";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import { Routes, Route } from "react-router-dom";
import SideBar from "./assets/components/SideBar";

function App() {
  return (
    <>
    <SideBar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
