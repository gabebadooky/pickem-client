import { useState,useEffect } from "react";
import "tailwindcss";
import { tokenStillValid } from "./services/validateToken";
import Login from "./components/Login";
import Picks from "./components/Picks";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthenticated(tokenStillValid());
    }, []);

    return(
        <div id="containter">
            { 
                !isAuthenticated 
                    && 
                <Login validateToken={validateToken} /> 
            }
            { 
                isAuthenticated 
                    && 
                <Picks validateToken={validateToken} /> 
            }
        </div>
    )
}