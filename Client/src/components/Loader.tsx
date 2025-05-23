import "../App.css"

import { useEffect } from "react";
type LoaderType = {
  isLoading: boolean;
};
export default function Loader({ isLoading }: LoaderType) {
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "visible";
  }, [isLoading]);

  return <div style={{
    opacity: isLoading ? "1" : "0",
    pointerEvents: isLoading ? "auto" : "none",
  }} className="loader"></div>;
}
