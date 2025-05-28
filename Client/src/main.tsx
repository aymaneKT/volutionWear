import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./App.css";
import { CartProvider } from "./Contexts/CartContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
