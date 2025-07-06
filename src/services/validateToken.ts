import { jwtDecode, JwtHeader } from "jwt-decode";

export const tokenStillValid = () => {
    if (!localStorage.getItem("jwt")) {
        // JWT not 
        console.log("JWT not found in local storage!");
        return false;
    } else {
        const decodedToken: JwtHeader = jwtDecode(localStorage.getItem("jwt") || "");
        const now: number = Date.now() / 1000;
        if (decodedToken.exp <= now) {
            // JWT is expired
            console.log("JWT token is expired!");
            localStorage.clear("jwt");
            return false;
        } else {
            // JWT is active
            return true;
        }
    }
}