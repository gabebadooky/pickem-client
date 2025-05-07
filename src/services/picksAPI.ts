import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { BASE_URL } from "./baseURL";


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


export const submitPick = async (pick: Pick) => {
    console.log(pick.pickWeight);
    const response = await fetch(`${BASE_URL}/picks/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: pick.username,
            gameID: pick.gameID,
            teamPicked: pick.teamPicked,
            pickWeight: pick.pickWeight
        })
    });
    if (!response.ok) {
        console.log(`Error occurred during submitPick request! ${response.text()}`);
        throw new Error(`Error occurred during submitPick request! ${response.text()}`);
    } else {
        const responseMessage = await response.json();
        console.log(`Pick Submitted!\n${await responseMessage.message}`);
    }
}

