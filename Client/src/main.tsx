import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./App.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);


{/* <div className="flex justify-between mb-5">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="accent-[#EA454C]"
                id="remember-me"
                onChange={(e) =>
                  setUser({ ...user, rememberMe: e.target.checked })
                }
                checked={user.rememberMe}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <span>Forgot password</span>
          </div> */}