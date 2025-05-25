import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./src/app";
import PicksContainer from "./src/components/PicksContainer";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import MyAccount from "./src/components/MyAccount";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="picks" element={<PicksContainer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="my-account" element={<MyAccount />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);