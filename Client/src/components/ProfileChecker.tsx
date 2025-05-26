import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useContext } from "react";
import { SectionContext } from "../Contexts/SectionContext";
import { useNavigate } from "react-router-dom";
import SellerDashbord from "./SellerDashbord";
import UserProfile from "./UserProfile";

type DecodedToken = {
  is_seller: string | boolean;
  [key: string]: any;
};

export default function ProfileChecker() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setSection } = useContext(SectionContext);
  const CheckUserIfIsSeller = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode<DecodedToken>(token);
    if (decodedToken.is_seller =="0" || decodedToken.is_seller === false) {
      setIsAdmin(false);
      return;
    }
    if (decodedToken.is_seller == "1" || decodedToken.is_seller === true) {
      setSection("Profile");
      setIsAdmin(true);
      return;
    }
  };
  useEffect(() => {
    CheckUserIfIsSeller();
  }, []);

  return isAdmin ? <SellerDashbord /> : <UserProfile />;
}
