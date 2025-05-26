import { useEffect, useState } from "react";
import Dashbord from "./Dashboard/Dashbord";
import Order from "./Order";
import Products from "./Products";
import Offers from "./Offers";
import SideBar from "./SideBar";
import Profile from "./Profile";
import { SectionContext } from "@/Contexts/SectionContext";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import HeadDashbord from "./Dashboard/HeadDashbord";
interface JwtPayload extends BaseJwtPayload {
  id?: number;
  is_seller?: boolean | string;
}
export default function SellerDashbord() {
  const [section, setSection] = useState<string>("Profile");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<string>("");

  const navigate = useNavigate();
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
      case "Profile":
        return <Profile />;
      default:
        return <Dashbord />;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode<JwtPayload>(token);
      const { is_seller } = decode;

      if (is_seller === false || is_seller === "false") {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

      setLoading(false);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString() + "");
    }, 1000);
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />
      <SectionContext.Provider
        value={{ section: section, setSection: setSection }}
      >
        <HeadDashbord subtitle={time} />
        <SideBar />
        {sectionHandler()}
      </SectionContext.Provider>
    </>
  );
}
