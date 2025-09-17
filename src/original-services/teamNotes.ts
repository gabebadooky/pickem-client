import { BASE_URL } from "./baseURL";
import { TeamNotes } from "../types/teamNotes";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const getTeamNotes = async (userID: number): Promise<Array<TeamNotes>> => {
    if (userID === -1) {
        return [{userID: -1, teamID: "teamID", notes: ""}];
    } else {
        const response = await fetch(`${BASE_URL}/teams/notes/${userID}`);
        if (!response.ok) {
            console.log(`Error occurred during getTeamNotes request! ${response.text}`);
            throw new Error(`Error occurred during getTeamNotes request! ${response.text}`);
        } else {
            return response.json();
        }
    }
}


export const updateTeamNotes = async (token: string, teamNotes: TeamNotes) => {
    const endpointURL: string = `${BASE_URL}/teams/update-notes`;
    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${token}`);
    }
    
    const requestBody: string = JSON.stringify({
        userID: teamNotes.userID,
        teamID: teamNotes.teamID,
        notes: teamNotes.notes
    });

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });
        
        if (!response.ok) {
            console.log(`Error occurred during updateTeamNotes request! ${response.text()}`);
        } else {
            const responseMessage = await response.json();
            console.log(`Team Notes Updated!\n${await responseMessage.message}`);
        }
    } catch (err) {
        console.log(`Error occurred during updateTeamNotes request! ${err}`);
    }
}