import { Team } from "../../types/team";


export const renderTeamName = (team: Team): string => {
    return team.league === "NFL" ? `${team.teamName} ${team.teamMascot}` : `${team.teamName}`;    
}