import { jwtDecode, JwtHeader } from "jwt-decode";

import { Token } from "../types/token";

export const validateToken = (): Token => {
    if (!localStorage.getItem("jwt")) {
        // JWT not present
        console.log("JWT not found in local storage!");
        return {
            active: false,
            userID: -1,
            value: ""
        };
    } else if (localStorage.getItem("jwt") === "guest") {
        console.log("guest sign in");
        return {
            active: true,
            userID: -1,
            value: ""
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
                    userID: -1,
                    value: ""
                };
            } else {
                console.log("JWT is active");
                // JWT is active
                if ("sub" in decodedToken) {
                    console.log("SUB property located");
                    return {
                        active: true,
                        userID: Number(decodedToken.sub),
                        value: localStorage.getItem("jwt") || ""
                    };
                } else if ("id" in decodedToken) {
                    console.log("ID property located");
                    return {
                        active: true,
                        userID: Number(decodedToken.id),
                        value: localStorage.getItem("jwt") || ""
                    };
                } else {
                    console.log("Sub or ID property not located in JWT token");
                    return {
                        active: false,
                        userID: -1,
                        value: ""
                    }
                }
            }
        } else {
            return {
                active: false,
                userID: -1,
                value: ""
            };
        }
    }
}