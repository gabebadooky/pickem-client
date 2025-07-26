import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/*
<BrowserRouter>
    <Routes>
        <Route index path="/" element={<App />} />
        <Route path="login" element={<Login setIsRegistering={() => {}} />} />
        <Route path="register" element={<Register setIsRegistering={() => {}} teams={[]} />} />
        <Route path="picks" element={<Picks currentUser={{userID: -1}} isModalCurrentlyRendered={false} jwtToken="" games={[]} picks={[]} setPicks={() => {}} setIsModalCurrentlyRendered={() => {}} teams={[]} userIDs={[]} />} />
        <Route path="account" element={<Account currentUser={{userID: -1}} jwtToken="" teams={[]} />} />
    </Routes>
</BrowserRouter>
*/