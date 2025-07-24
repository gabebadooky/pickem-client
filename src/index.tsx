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
            <Route index path="/" element={<App />} />
            <Route path="login" element={<Login setIsRegistering={() => {}} />} />
            <Route path="register" element={<Register setIsRegistering={() => {}} teams={[]} />} />
            <Route path="picks" element={<Picks currentUser={{userID: -1}} isModalCurrentlyRendered={false} jwtToken="" games={[]} picks={[]} setPicks={() => {}} setIsModalCurrentlyRendered={() => {}} teams={[]} userIDs={[]} />} />
            <Route path="account" element={<Account currentUser={{userID: -1}} jwtToken="" teams={[]} />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);
