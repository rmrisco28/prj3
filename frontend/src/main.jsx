import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// bootstrap 임포트
import "bootstrap/dist/css/bootstrap.man.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
