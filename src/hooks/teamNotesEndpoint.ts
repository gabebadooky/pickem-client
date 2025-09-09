import { pickemEndpointURL } from "../types/baseURLs";
import { TeamNotes } from "../types/teamNotes";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const callGetTeamNotesEnpdoint = async (userID: number): Promise<TeamNotes[]> => {
    try {
        if (userID < 0) {
            return [{userID: -1, teamID: "teamID", notes: ""}];
        } else {
            const response = await fetch(`${pickemEndpointURL}/teams/notes/${userID}`);
            return response.json();
        }
    } catch (err) {
        return [{userID: -1, teamID: "teamID", notes: ""}];
    }
}


export const callUpdateTeamNotesEndpoint = async (token: string, teamNotes: TeamNotes): Promise<boolean> => {
    // Returns true if endpoint is invoked successfully and false if not
    const endpointURL: string = `${pickemEndpointURL}/teams/update-notes`;
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
            return false;
        } else {
            const responseMessage = await response.json();
            return "error" in responseMessage ? false : true;
        }
    } catch (err) {
        return false;
    }
}