import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";
import { BASE_URL } from "./baseURL";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const getGames =  async (): Promise<Array<Game>> => {
    const response = await fetch(`${BASE_URL}/games`);
    if (!response.ok) {
        console.log(`Error occurred during getGames request! ${response.text}`);
        throw new Error(`Error occurred during getGames request! ${response.text}`);
    } else {
        return response.json();
    }
}


export const getTeams = async (): Promise<Array<Team>> => {
    const response = await fetch(`${BASE_URL}/teams`);
    if (!response.ok) {
        console.log(`Error occurred during getTeams request! ${response.text}`);
        throw new Error(`Error occurred during getTeams request! ${response.text}`);
    } else {
        console.log(response.json());
        return response.json();
    }
}


export const getUserPicks = async (userID: string): Promise<Array<Pick>> => {
    const response = await fetch(`${BASE_URL}/picks/${userID}`);
    if (!response.ok) {
        console.log(`Error occurred during geUserPicks request! ${response.text}`);
        throw new Error(`Error occurred during geUserPicks request! ${response.text}`);
    } else {
        return response.json();
    }
}


export const getUserIDs = async (): Promise<Array<UserIDs>> => {
    const response = await fetch(`${BASE_URL}/user/ids`);
    if (!response.ok) {
        console.log(`Error occurred during getUserIDs request! ${response.text}`);
        throw new Error(`Error occurred during getUserIDs request! ${response.text}`);
    } else {
        return response.json();
    }
}


export const submitPick = async (token: string, pick: Pick) => {
    console.log(pick.pickWeight);
    const endpointURL: string = `${BASE_URL}/picks/submit`;
    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${token}`);
    }
    
    const requestBody: string = JSON.stringify({
        userID: pick.userID,
        gameID: pick.gameID,
        teamPicked: pick.teamPicked,
        pickWeight: pick.pickWeight
    });

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });
        
        if (!response.ok) {
            console.log(`Error occurred during submitPick request! ${response.text()}`);
        } else {
            const responseMessage = await response.json();
            console.log(`Pick Submitted!\n${await responseMessage.message}`);
        }
    } catch (err) {
        console.log(`Error occurred during submitPick request! ${err}`);
    }
}

