import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "tailwindcss";

import Login from "./components/Login";
import Picks from "./components/Picks";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const validateToken = () => {
        if (!localStorage.getItem("jwt")) {
            console.log("Nothing found in local storage");
            setIsAuthenticated(false);
        } else if (!jwtDecode(localStorage.getItem("jwt") || "").exp) {
            console.log("No JWT expiration property found in local storing");
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
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