import { pickemEndpointURL } from "../types/baseURLs";


export const callRegisterNewUserEndpoint = async (username: string, password: string, displayName: string | undefined, favoriteTeam: string, notificationPreference: string, emailAddress: string, phone: string) => {
    const endpointURL: string = `${pickemEndpointURL}/auth/register`;
    const requestBody: string = JSON.stringify({
        "username": username,
        "password": password,
        "displayName": displayName || username,
        "favoriteTeam": favoriteTeam,
        "notificationPreference": notificationPreference,
        "emailAddress": emailAddress,
        "phone": phone
    });

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody
        });

        if (!response.ok) {
            console.log(`Error occurred during Register request! ${response.text()}`);
            throw new Error(`Error occurred during Register request! ${response.text()}`);
        } else {
            const responseJSON = await response.json();
            return responseJSON;
        }
    } catch (err) {
            console.log(`Error occurred during Register request! ${err}`);
            throw new Error(`Error occurred during Register request! ${err}`);
    }
}