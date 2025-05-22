import { useEffect, useState } from "react";

import "tailwindcss";

import Login from "../components/login";
import Register from "../components/register";
import PicksContainer from "../components/PicksContainer";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);


    useEffect(() => {
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
                <PicksContainer setIsAuthenticated={setIsAuthenticated} />
            }
        </div>
    );
}