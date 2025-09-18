import { jwtDecode, JwtHeader } from "jwt-decode";


export const validateAuthenticatedUserID = (): number => {
    if (!localStorage.getItem("jwt")) {
        // JWT not present
        console.log("JWT not found in local storage!");
        return -1;

    } else {
        /// JWT is present
        const decodedToken: JwtHeader = jwtDecode(localStorage.getItem("jwt") || "");
        const now: number = Date.now() / 1000;

        if ("exp" in decodedToken) {
            const tokenExpiration = decodedToken.exp;

            if (Number(tokenExpiration) <= now) {
                // JWT is expired
                console.log("JWT token is expired!");
                localStorage.clear();
                return -1;
        
            } else {
                // JWT is active
                console.log("JWT is active");

                if ("sub" in decodedToken) {
                    console.log("SUB property located");
                    return Number(decodedToken.sub);

                } else if ("id" in decodedToken) {
                    console.log("ID property located");
                    return Number(decodedToken.id);

                } else {
                    console.log("Sub or ID property not located in JWT token");
                    return -1;
        
                }
            }
        } else {
            // "exp" not in decodedToken
            return -1;
    
        }
    }
}