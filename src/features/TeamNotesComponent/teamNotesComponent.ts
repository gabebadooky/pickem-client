import { TeamNotesComponentProps } from "./types";
import { callUpdateTeamNotesEndpoint } from "../../hooks/teamNotesEndpoint";


const updateTeamNotesInDatabaseAndState = (newNotes: string, props: TeamNotesComponentProps) => {
    callUpdateTeamNotesEndpoint(localStorage.getItem("jwt") || "", {
        userID: props.teamNotes.userID,
        teamID: props.teamNotes.teamID,
        notes: newNotes
    })
    .then((response) => {
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
            alert("Error occurred updating team notes! Please try again and let the developer know he sucks...");
        }
        
    });
}


export default updateTeamNotesInDatabaseAndState;