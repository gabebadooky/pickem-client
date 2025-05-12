import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "../components/login";
import PicksContainer from "../components/picks";



export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("jwt")?.trim() === null);
    }, []);

    const authenticateUser = (token: string) => {
        const decodedToken = jwtDecode(token);
        const decodedUserID = decodedToken.sub?.toString();

        localStorage.setItem("jwt", token);
        console.log(`isAuthenticated: ${localStorage.getItem("jwt")?.trim() !== null}`);
        
        if (decodedUserID) {
            setIsAuthenticated(localStorage.getItem("jwt")?.trim() !== null);
        }
        
        console.log(`decodedToken.sub: ${decodedToken.sub}`);
        console.log(`decodedToken.sub: ${decodedToken.exp}`);
        console.log(`localStorage[jwt]: ${localStorage.getItem("jwt")}`);
        
    }

    return(
        <>
            {
                !isAuthenticated
                    &&
                <Login setAuthenticateUser={authenticateUser} />
            }

            {
                isAuthenticated
                    &&
                <PicksContainer token={localStorage.getItem("jwt") || ""} />
            }
        </>
    );
}
