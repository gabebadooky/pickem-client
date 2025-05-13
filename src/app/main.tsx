import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import style from "./style";
import Login from "../components/login";
import RegisterInputs from "../components/register";
import PicksContainer from "../components/picks";



export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("jwt")?.trim() !== undefined || localStorage.getItem("jwt")?.trim() !== null);
    }, []);

    const authenticateUser = (token: string) => {
        const decodedToken = jwtDecode(token);
        const decodedUserID = decodedToken.sub?.toString();

        localStorage.setItem("jwt", token);
        console.log(`isAuthenticated: ${localStorage.getItem("jwt")?.trim() !== null}`);
        
        if (decodedUserID) {
            setIsAuthenticated(localStorage.getItem("jwt")?.trim() !== null);
        }
        
        console.log(`localStorage.getItem("jwt"): ${localStorage.getItem("jwt")}`);
        
    }

    return(
        <div id="main-container" style={style}>
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