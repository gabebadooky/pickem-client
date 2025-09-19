import { TeamNotesProps } from "./types";
import { callGetTeamNotesEnpdoint, callUpdateTeamNotesEndpoint } from "../../../hooks/teamsEndpoints";
import { TeamNotes } from "../../../types/teamNotes";


export const fetchTeamNotesFromDatabase = async (userID: number, teamID: string) => {
    let allUserTeamNotes: TeamNotes[] = await callGetTeamNotesEnpdoint(userID);

    try {
        return allUserTeamNotes.find((teamNotes) => teamNotes.userID === userID && teamNotes.teamID === teamID) || {userID: userID, teamID: teamID, notes: ""};
    } catch {
        return {userID: userID, teamID: teamID, notes: ""};
    }
}


export const updateTeamNotesInDatabaseAndState = (newNotes: string, props: TeamNotesProps) => {
    try {
        callUpdateTeamNotesEndpoint(localStorage.getItem("jwt") || "", {
            userID: props.authenticatedUser.userID,
            teamID: props.team.teamID,
            notes: newNotes
        });
    } catch {
        alert("Error occurred updating team notes! Please try again and let the developer know he sucks. 🙃");
    }
    {/*
    .then((response: boolean) => {
        if (response) {
            props.setTeamNotes(props.allTeamNotes.map(note => 
                note.userID === props.authenticatedUser.userID
                    &&
                note.teamID === props.team.teamID
                    ?
                { ...note,
                    notes: newNotes
                } : note
            ));
        } else {
            alert("Error occurred updating team notes! Please try again and let the developer know he sucks. 🙃");
        }
    })
    
    .catch(() => alert("Error occurred updating team notes! Please try again and let the developer know he sucks. 🙃"));
    */}
}