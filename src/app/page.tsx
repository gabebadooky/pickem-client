import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PicksContainer from "../components/picks";
import RegisterInputs from "../components/register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RegisterInputs />
  </StrictMode>
);