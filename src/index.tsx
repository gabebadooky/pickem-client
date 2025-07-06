import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import { App } from "./app";
import Login from "./components/Login";
import Register from "./components/Register";
import Picks from "./components/Picks";
import Account from "./components/Account";


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
