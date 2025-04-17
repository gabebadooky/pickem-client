import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PicksContainer from "../components/picks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PicksContainer />
  </StrictMode>
);