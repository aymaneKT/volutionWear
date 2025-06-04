import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useContext } from "react";
import { SectionContext } from "../Contexts/SectionContext";
import { useNavigate } from "react-router-dom";
import SellerDashbord from "./SellerDashbord";
import UserProfile from "./UserProfile";
import Loader from "./Loader";

type DecodedToken = {
  is_seller: string | boolean;
  [key: string]: any;
};

export default function ProfileChecker() {
  const [isSeller, setIsSeller] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { setSection } = useContext(SectionContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const sellerStatus =
        decodedToken.is_seller == "1" || decodedToken.is_seller === true;
      setIsSeller(sellerStatus);
      if (sellerStatus) {
        setSection("Profile");
      }
    } catch (error) {
      navigate("/login");
    }
  }, [navigate, setSection]);

  return isSeller === null ? (
    <Loader />
  ) : isSeller ? (
    <SellerDashbord />
  ) : (
    <UserProfile />
  );
}
