import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { App } from "./src/app";
import { Login } from "./src/components/Login";
import Register from "./src/components/Register";
import Picks from "./src/components/Picks";
import Account from "./src/components/Account";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index path="picks" element={<Picks />} />
            <Route path="account" element={<Account />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);