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
import axios from "axios";
import { log } from "console";

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
  const [img, setImg] = useState<File | null>(null);
  const [response , setResponse] = useState<string | undefined>("")
  return (
    // <>
    //   <SideBar section={section} setSection={setSection} />
    //   {sectionHandler()}
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //   </Routes>
    // </>
    <>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImg(e.target.files[0]);
          }
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          let image = new FormData();
          if (!img) {
            alert("Nessuna immagine selezionata.");
            return;
          }
          image.append("image", img);
          axios
            .post("http://localhost:3000/api/upload", image, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((r) => {
              console.log(r);
              setResponse(r.data.file.filename)
              console.log(r.data.file.originalname);
              
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        SEFT
      </button>
      <img src={response} alt="immagine" />
    </>
  );
}

export default App;
