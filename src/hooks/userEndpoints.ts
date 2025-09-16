import { pickemEndpointURL } from "../types/baseURLs";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


const userAccountUpdatePostRequest = async (endpointURL: string, token: string, requestBody: string) => {
    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${token}`);
    }

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });

        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
}


export const callUpdateDisplayNameEndpoint = async (props: {token: string, userID: string, displayName: string}) => {
    const endpointURL: string = `${pickemEndpointURL}/user/update-display-name`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        displayName: props.displayName
    });

    userAccountUpdatePostRequest(endpointURL, props.token, requestBody);
}


export const callUpdateEmailEndpoint = async (props: {token: string, userID: string, emailAddress: string}) => {
    const endpointURL: string = `${pickemEndpointURL}/user/update-email`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        emailAddress: props.emailAddress
    });

    userAccountUpdatePostRequest(endpointURL, props.token, requestBody);
}


export const callUpdatePhoneEndpoint = async (props: {token: string, userID: string, phone: string}) => {
    const endpointURL: string = `${pickemEndpointURL}/user/update-phone`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        emailAddress: props.phone
    });

    userAccountUpdatePostRequest(endpointURL, props.token, requestBody);
}


export const callUpdateFavoriteTeamEndpoint = async (props: {token: string, userID: string, favoriteTeam: string}) => {
    const endpointURL: string = `${pickemEndpointURL}/user/update-favorite-team`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        emailAddress: props.favoriteTeam
    });

    userAccountUpdatePostRequest(endpointURL, props.token, requestBody);
}


export const callUpdateNotificationPreferenceEndpoint = async (props: {token: string, userID: string, notificationPreference: string}) => {
    const endpointURL: string = `${pickemEndpointURL}/user/notification-preference`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        emailAddress: props.notificationPreference
    });

    userAccountUpdatePostRequest(endpointURL, props.token, requestBody);
}