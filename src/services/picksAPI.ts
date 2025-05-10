import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { BASE_URL } from "./baseURL";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const getGames =  async (): Promise<Game[]> => {
    const response = await fetch(`${BASE_URL}/games`);
    if (!response.ok) {
        console.log(`Error occurred during getGames request! ${response.text}`);
        throw new Error(`Error occurred during getGames request! ${response.text}`);
    } else {
        return response.json();
    }
}


export const getTeams = async (): Promise<Team[]> => {
    const response = await fetch(`${BASE_URL}/teams`);
    if (!response.ok) {
        console.log(`Error occurred during getTeams request! ${response.text}`);
        throw new Error(`Error occurred during getTeams request! ${response.text}`);
    } else {
        return response.json();
    }
}


export const getUserPicks = async (username: string): Promise<Pick[]> => {
    const response = await fetch(`${BASE_URL}/picks/${username}`);
    if (!response.ok) {
        console.log(`Error occurred during geUserPicks request! ${response.text}`);
        throw new Error(`Error occurred during geUserPicks request! ${response.text}`);
    } else {
        return response.json();
    }
}


export const submitPick = async (token: string, pick: Pick) => {
    console.log(pick.pickWeight);
    const endpointURL: string = `${BASE_URL}/picks/submit`;
    pickemHeaders.append("Authorization", token);
    const requestBody: string = JSON.stringify({
        username: pick.username,
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

