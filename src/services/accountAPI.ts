import { BASE_URL } from "./baseURL";
import {
    CurrentUser, 
    UpdateFavoriteTeamProps, 
    UpdateNotificationPreferenceProps, 
    UpdateEmailAddressProps, 
    UpdatePhoneProps
} from "../types/account";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const getUser =  async (userID: number): Promise<CurrentUser> => {
    if (userID > -1) {
        const response = await fetch(`${BASE_URL}/user/${userID}`);
        if (!response.ok) {
            console.log(`Error occurred during getUser request for userID: ${userID}! ${response.text}`);
            throw new Error(`Error occurred during getUser request for userID: ${userID}! ${response.text}`);
        } else {
            return response.json();
        }
    } else {
        return {userID: -1, username: ""};
    }
}


export const updateFavoriteTeam = async (props: UpdateFavoriteTeamProps) => {
    const endpointURL: string = `${BASE_URL}/user/update-favorite-team`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        favoriteTeam: props.favoriteTeam
    });

    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${props.token}`);
    }

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });

        if (!response.ok) {
            console.log(`updateFavoriteTeam request did not return a 200 status code! ${response.text()}`);
        } else {
            const responseMessage = await response.json();
            console.log(`Favorite Team succcessfully updated! ${responseMessage.message}`);
        }
    } catch (err) {
        console.log(`Error occurred during updateFavoriteTeam endpoint! ${err}`);
    }
}


export const updateNotificationPreference = async (props: UpdateNotificationPreferenceProps) => {
    const endpointURL: string = `${BASE_URL}/user/update-notification-preference`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        notificationPreference: props.notificationPreference
    });

    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${props.token}`);
    }

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });

        if (!response.ok) {
            console.log(`updateNotificationPreference request did not return a 200 status code! ${response.text()}`);
        } else {
            const responseMessage = await response.json();
            console.log(`Notification Preference succcessfully updated! ${responseMessage.message}`);
        }
    } catch (err) {
        console.log(`Error occurred during updateNotificationPreference endpoint! ${err}`);
    }
}


export const updateEmailAddress = async (props: UpdateEmailAddressProps) => {
    const endpointURL: string = `${BASE_URL}/user/update-email`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        emailAddress: props.emailAddress
    });

    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${props.token}`);
    }

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });

        if (!response.ok) {
            console.log(`updateEmailAddress request did not return a 200 status code! ${response.text()}`);
        } else {
            const responseMessage = await response.json();
            console.log(`Email Address succcessfully updated! ${responseMessage.message}`);
        }
    } catch (err) {
        console.log(`Error occurred during updateEmailAddress endpoint! ${err}`);
    }
}


export const updatePhone = async (props: UpdatePhoneProps) => {
    const endpointURL: string = `${BASE_URL}/user/update-phone`;
    const requestBody: string = JSON.stringify({
        userID: props.userID,
        phone: props.phone
    });

    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${props.token}`);
    }

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });

        if (!response.ok) {
            console.log(`updatePhone request did not return a 200 status code! ${response.text()}`);
        } else {
            const responseMessage = await response.json();
            console.log(`Phone succcessfully updated! ${responseMessage.message}`);
        }
    } catch (err) {
        console.log(`Error occurred during updatePhone endpoint! ${err}`);
    }
}