import { LoginBody, User } from "../types/user";
import { BASE_URL } from "./baseURL";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const registerNewUser = async (user: User) => {
    console.log(`Calling register endpoint for user: ${user.username}`);
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: user.username,
            password: user.password,
            favoriteTeam: user.favoriteTeam,
            notificationPreference: user.notificationPreference,
            emailAddress: user.emailAddress,
            phone: user.phone
        })
    });

    if (!response.ok) {
        console.log(`Error occurred during registerNewUser request! ${response.text()}`);
        throw new Error(`Error occurred during registerNewUser request! ${response.text()}`);
    } else {
        const responseJSON = await response.json();
        const responseStatusCode = response.status;
        const responseMessage = await responseJSON.message;
        if (responseStatusCode === 200 && responseMessage === "Success") {
            console.log(`New user registered!\n${responseMessage.message}`);
            return responseMessage;
        } else if (responseStatusCode === 200 && responseMessage === "User already exists!" ) {
            console.log(`User ${user.username} already exists!`);
            return responseMessage;
        } else {
            console.log(`Error occurred registering user\n${responseMessage}`)
            return responseMessage;
        }
    }
}


export const loginRequest = async (loginBody: LoginBody) => {
    console.log(`Calling login endpoint for user: ${loginBody.username}`);
    const endpointURL = `${BASE_URL}/auth/login`;
    const requestBody: string = JSON.stringify({"username": loginBody.username, "password": loginBody.password});

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
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
        console.log(`Error occurred during Login request! ${err}`);
        return JSON.stringify({"access_token" : ""});
    }
};