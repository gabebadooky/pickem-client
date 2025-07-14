import { LoginBody, User } from "../types/user";
import { BASE_URL } from "./baseURL";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const registerNewUser = async (user: User) => {
    console.log(`Calling register endpoint for user: ${user.username}`);
    const endpointURL = `${BASE_URL}/auth/register`;
    const requestBody: string = JSON.stringify({
        "username": user.username,
        "password": user.password,
        "favoriteTeam": user.favoriteTeam,
        "notificationPreference": user.notificationPreference,
        "emailAddress": user.emailAddress,
        "phone": user.phone
    });

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody
        });

        if (!response.ok) {
            console.log(`Error occurred during Login request! ${response.text()}`);
            return JSON.stringify({"access_token": ""});
        } else {
            const responseJSON = await response.json();
            return responseJSON;
        }
    } catch (err) {

    }
}


export const loginRequest = async (loginBody: LoginBody) => {
    console.log(`Calling login endpoint for user: ${loginBody.username}`);
    const endpointURL: string = `${BASE_URL}/auth/login`;
    const requestBody: string = JSON.stringify({"username": loginBody.username, "password": loginBody.password});

    try {
        const response: Response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });

        if (!response.ok) {
            console.log(`Error occurred during Login request! ${response.text()}`);
            return JSON.stringify({"access_token": ""});
        } else {
            const responseJSON = await response.json();
            console.log("Login request successful");
            return responseJSON;
        }
    } catch (err) {
        console.log(`Error occurred during Login request! ${err}`);
        return JSON.stringify({"access_token" : ""});
    }
};