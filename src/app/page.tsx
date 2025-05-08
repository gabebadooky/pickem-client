import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginInputs from "../components/login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginInputs />
  </StrictMode>
);