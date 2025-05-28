import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "tailwindcss";

import Login from "./components/login";
import PicksContainer from "./components/PicksContainer";
import Register from "./components/register";





export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [renderRegister, setRenderRegister] = useState<boolean>(false);

    const validateToken = () => {
        if (!localStorage.getItem("jwt")) {
            console.log("Nothing found in local storage");
            setIsAuthenticated(false);
        } else if (!jwtDecode(localStorage.getItem("jwt") || "").exp) {
            console.log("No JWT expiration property found in local storing")
            localStorage.clear();
            setIsAuthenticated(false);
        } else {
            //const tokenExp: number = jwtDecode(localStorage.getItem("jwt") || "").exp || 0;
            //console.log(`tokenExp: ${tokenExp}`);
            //console.log(`Date.now(): ${Date.now() / 1000}`);
            //console.log(`Checking if token is still active: ${tokenExp > Date.now() / 1000}`);
            //setIsAuthenticated(tokenExp > (Date.now() / 1000));
            setIsAuthenticated(true);
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    return(
        <div id="main-container">
            {
                !isAuthenticated
                    &&
                !renderRegister
                    &&
                <Login validateToken={validateToken} setRenderRegister={setRenderRegister} />
            }
            {
                !isAuthenticated
                    &&
                renderRegister
                    &&
                <Register validateToken={validateToken} />
            }
            {
                isAuthenticated
                    &&
                <PicksContainer />
            }
        </div>
    );
}