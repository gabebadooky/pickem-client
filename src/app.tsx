import { useState,useEffect } from "react";
import { jwtDecode, JwtHeader } from "jwt-decode";
import "tailwindcss";

import Login from "./components/Login";
import Picks from "./components/Picks";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const validateToken = () => {
        if (!localStorage.getItem("jwt")) {
            // JWT not 
            console.log("JWT not found in local storage!");
            setIsAuthenticated(false);
        } else {
            const decodedToken: JwtHeader = jwtDecode(localStorage.getItem("jwt") || "");
            const now: number = Date.now() / 1000;
            if (decodedToken.exp <= now) {
                // JWT is expired
                console.log("JWT token is expired!");
                localStorage.clear("jwt");
                setIsAuthenticated(false);
            } else {
                // JWT is active
                setIsAuthenticated(true);
            }
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    return(
        <div id="containter">
            { !isAuthenticated && <Login /> }
            { isAuthenticated && <Picks /> }
        </div>
    )
}