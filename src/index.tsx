import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import { BettingOdds } from "./features/BettingOdds";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BettingOdds />
  </StrictMode>
);
