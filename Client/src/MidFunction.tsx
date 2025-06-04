import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const expTime = decoded.exp * 1000;
    return Date.now() > expTime;
  } catch (error) {
    console.error("Error decoding the token:", error);
    return true;
  }
};
export const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Token expired and removed from localStorage");
    toast.info("La sessione è scaduta. Effettua nuovamente il login.", {
      position: "top-left",
      autoClose: 3000,
    });
  }
};
