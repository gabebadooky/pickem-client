import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { Picks } from "./pages/Picks";
import { StrictMode } from "react";
import { callGetAllTeamsEndpoint } from "./hooks/teamsEndpoints";
import { callGetAllUsersEndpoint, callGetUserByIDEndpoint } from "./hooks/userEndpoints";
import { validateAuthenticatedUserID } from "./utils/auth";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Account } from "./pages/Account";
import "tailwindcss";
import About from "./pages/About/page";


const router = createBrowserRouter([
    {
        path: "/",
        loader: async () => {
            return {
                allTeams: await callGetAllTeamsEndpoint(),
                allUsers: await callGetAllUsersEndpoint(),
                authenticatedUser: await callGetUserByIDEndpoint(validateAuthenticatedUserID())
            }
        },
        Component: Picks
    },

    {
        path: "/login",
        Component: Login
    },

    {
        path: "/register",
        loader: async () => {
            return {
                allTeams: await callGetAllTeamsEndpoint()
            }
        },
        Component: Register
    },

    {
        path: "/account",
        loader: async () => {
            return {
                allTeams: await callGetAllTeamsEndpoint(),
                authenticatedUser: await callGetUserByIDEndpoint(validateAuthenticatedUserID())
            }
        },
        Component: Account
    },

    {
        path: "/about",
        Component: About
    }
]);


const root = document.getElementById("root");


ReactDOM.createRoot(root!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);