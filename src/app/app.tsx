import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "tailwindcss";
import Login from "../components/login";
import RegisterInputs from "../components/register";
import PicksContainer from "../components/PicksContainer";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);


    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("jwt")?.trim() !== undefined || localStorage.getItem("jwt")?.trim() !== null);
    }, []);

    const authenticateUser = (token: string) => {
        //const decodedToken = jwtDecode(token);
        const decodedUserID = jwtDecode(token).sub?.toString();
        localStorage.setItem("jwt", token);
        
        if (decodedUserID) {
            setIsAuthenticated(localStorage.getItem("jwt")?.trim() !== null);
        }
    }

    return(
        <div id="main-container">
            {
                !isAuthenticated
                    &&
                !isRegistering
                    &&
                <Login authenticateUser={authenticateUser} setIsRegistering={setIsRegistering} />
            }

            {
                !isAuthenticated
                    &&
                isRegistering
                    &&
                <RegisterInputs authenticateUser={authenticateUser} />
            }

            {
                isAuthenticated
                    &&
                <PicksContainer setIsAuthenticated={setIsAuthenticated} />
            }
        </div>
    );
}