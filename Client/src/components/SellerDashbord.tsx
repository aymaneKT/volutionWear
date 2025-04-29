import { useState } from "react";
import Dashbord from "./Dashboard/Dashbord";
import Order from "./Order";
import Products from "./Products";
import Offers from "./Offers";
import SideBar from "./SideBar";
import Profile from "./Profile";
import { SectionContext } from "@/Contexts/SectionContext";

export default function SellerDashbord() {
  const [section, setSection] = useState<string>("Dashboard");
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
  return (
    <>
      <SectionContext.Provider
        value={{ section: section, setSection: setSection }}
      >
        <SideBar />
        {sectionHandler()}
      </SectionContext.Provider>
    </>
  );
}
