import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "../components/login";
import PicksContainer from "../components/picks";



export const App = () => {
    const [accessToken, setAccessToken] = useState<string>("");
    const [userID, setUserID] = useState<string>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const authenticateUser = (token: string) => {
        localStorage.setItem("jwt", token);
        setAccessToken(token);
        setIsAuthenticated(true);
        setUserID(jwtDecode(token).sub);
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
                <PicksContainer />
            }
        </>
    );
}