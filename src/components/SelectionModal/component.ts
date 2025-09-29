import { TeamNotes } from "../../types/teamNotes";


export const instantiateTeamNotes = (allTeamNotes: TeamNotes[], userID: number, teamID: string): TeamNotes => {
    return allTeamNotes.find(teamNote => { teamNote.userID === userID && teamNote.teamID === teamID }) || { userID: userID, teamID: teamID, notes: "" };
};
