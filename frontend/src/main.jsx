import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./feature/App.jsx";
// bootstrap 임포트
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
);
