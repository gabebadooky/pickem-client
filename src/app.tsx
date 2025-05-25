import { useEffect, useState } from "react";

import "tailwindcss";

import Login from "./components/Login";
import Register from "./components/Register";
import PicksContainer from "./components/PicksContainer";
import MyAccount from "./components/MyAccount";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isUpdatingAccount, setIsUpdatingAccount] = useState<boolean>(false);


    useEffect(() => {
        // Verify  if an active access token exists
        setIsAuthenticated(localStorage.getItem("jwt")?.trim() !== undefined && localStorage.getItem("jwt")?.trim() !== null);
    }, []);

    return(
        <div id="main-container">
            {
                !isAuthenticated
                    &&
                !isRegistering
                    &&
                <Login setIsAuthenticated={setIsAuthenticated} setIsRegistering={setIsRegistering} />
            }

            {
                !isAuthenticated
                    &&
                isRegistering
                    &&
                <Register setIsAuthenticated={setIsAuthenticated} />
            }

            {
                isAuthenticated
                    &&
                !isUpdatingAccount
                    &&
                <PicksContainer setIsAuthenticated={setIsAuthenticated} setIsUpdatingAccount={setIsUpdatingAccount} />
            }

            {
                isAuthenticated
                    &&
                isUpdatingAccount
                    &&
                <MyAccount  />
            }
        </div>
    );
}