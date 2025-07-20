import { jwtDecode, JwtHeader } from "jwt-decode";

import { Token } from "../types/token";

export const validateToken = (): Token => {
    if (!localStorage.getItem("jwt")) {
        // JWT not present
        console.log("JWT not found in local storage!");
        return {
            active: false,
            userID: 0
        };
    } else if (localStorage.getItem("jwt") === "guest") {
        console.log("guest sign in");
        return {
            active: false,
            userID: 0
        };
    } else {
        const decodedToken: JwtHeader = jwtDecode(localStorage.getItem("jwt") || "");
        const now: number = Date.now() / 1000;
        if ("exp" in decodedToken) {
            const tokenExpiration = decodedToken.exp;
            if (Number(tokenExpiration) <= now) {
                // JWT is expired
                console.log("JWT token is expired!");
                localStorage.clear();
                return {
                    active: false,
                    userID: 0
                };
            } else {
                // JWT is active
                if ("sub" in decodedToken || "id" in decodedToken) {
                    return {
                        active: true,
                        userID: decodedToken.sub || decodedToken.id;
                    };
                }
            }
        } else {
            return {
                active: false,
                userID: 0
            };
        }
    }
}