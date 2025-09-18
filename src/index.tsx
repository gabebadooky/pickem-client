import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { Picks } from "./pages/Picks";
import { callGetAllTeamsEndpoint } from "./hooks/teamsEndpoints";
import { callGetAllUsersEndpoint } from "./hooks/userEndpoints";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Picks
            allTeams={await callGetAllTeamsEndpoint()}
            allUsers={await callGetAllUsersEndpoint()}
        />
    }
]);


const root = document.getElementById("root");


ReactDOM.createRoot(root!).render(
    <RouterProvider router={router} />
);