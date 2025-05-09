import { useEffect, useState } from "react";
import Dashbord from "./Dashboard/Dashbord";
import Order from "./Order";
import Products from "./Products";
import Offers from "./Offers";
import SideBar from "./SideBar";
import Profile from "./Profile";
import { SectionContext } from "@/Contexts/SectionContext";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";
import Loader from "./Loader";
interface JwtPayload extends BaseJwtPayload {
  id?: number;
  is_seller?: boolean | string;
}
export default function SellerDashbord() {
  const [section, setSection] = useState<string>("Dashboard");
  const [isLoading, setLoading] = useState<boolean>(true);

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
      const { id, is_seller } = decode;

      if (is_seller === false || is_seller === "false") {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setLoading(false);
    } else {
      window.location.href = "/login";
    }
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />
      <SectionContext.Provider
        value={{ section: section, setSection: setSection }}
      >
        <SideBar />
        {sectionHandler()}
      </SectionContext.Provider>
    </>
  );
}
