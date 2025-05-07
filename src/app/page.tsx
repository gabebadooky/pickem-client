import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RegisterInputs from "../components/register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RegisterInputs />
  </StrictMode>
);