import { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import "tailwindcss";

import Login from "./components/Login";
import PicksContainer from "./components/PicksContainer";


const validateToken: () => boolean = () => {
    if (!localStorage.getItem("jwt")) {
        return false;
    } else if (!jwtDecode(localStorage.getItem("jwt") || "").exp) {
        return false;
    } else {
        const tokenExp: number = jwtDecode(localStorage.getItem("jwt") || "").exp || 0;
        return tokenExp > Date.now();
    }
}


export const App = () => {
    const [activeTokenExists, setActiveTokenExists] = useState<boolean>(false);

    useEffect(() => {
        setActiveTokenExists(validateToken());
    }, []);

    return(
        <div id="main-container">
            {
                !activeTokenExists
                    &&
                <Login setActiveTokenExists={setActiveTokenExists} />
            }
            {
                activeTokenExists
                    &&
                <PicksContainer />
            }
        </div>
    );
}