import "../App.css";

import { useEffect } from "react";
type LoaderType = {
  isLoading: boolean;
};
export default function Loader({ isLoading }: LoaderType) {
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "visible";
  }, [isLoading]);

  return <div className="loader"></div>;
}
