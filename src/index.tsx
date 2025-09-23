import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { Picks } from "./pages/Picks";
import { StrictMode } from "react";
import { callGetAllTeamsEndpoint } from "./hooks/teamsEndpoints";
import { callGetAllUsersEndpoint, callGetUserByIDEndpoint } from "./hooks/userEndpoints";
import { validateAuthenticatedUserID } from "./utils/auth";
import { Register } from "./pages/Register";


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
        element: <Picks />
    },

    {
        path: "/register",
        loader: async () => {
            return {
                allTeams: await callGetAllTeamsEndpoint()
            }
        },
        element: <Register />
    }
]);



const root = document.getElementById("root");


ReactDOM.createRoot(root!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);