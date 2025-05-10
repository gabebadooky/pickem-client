import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { BASE_URL } from "./baseURL";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");
pickemHeaders.append("Authorization")
const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NjgxNjg1NywianRpIjoiYTA2MDBhMjUtZjc2Zi00YWU4LTk0ZjYtZDI0ZTEwMWI2ODE4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzQ2ODE2ODU3LCJjc3JmIjoiZjk1N2I1OTItMWMxNC00NzdmLTg0YjMtMjM0N2VmN2NlM2UzIiwiZXhwIjoxNzQ2ODE3NzU3fQ.Heoq7McO6nVMmUvsK6FbokvzNYEVahbeURoBKceWn3E";

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
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
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

