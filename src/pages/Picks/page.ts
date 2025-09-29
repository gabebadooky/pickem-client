import { Team } from "../../types/team";


export const findUsersFavoriteTeamPrimaryColor = (favoriteTeam: string | undefined, allTeams: Team[]): string => {
    if (favoriteTeam) {
        return `#${allTeams.find((team) => team.teamID === favoriteTeam)?.primaryColor}` || "#ADACAC";
    } else {
        return "#ADACAC";
    }
    
}


export const findUsersFavoriteTeamAlternateColor = (favoriteTeam: string | undefined, allTeams: Team[]): string => {
    return `#${allTeams.find((team) => team.teamID === favoriteTeam)?.alternateColor}` || "#FFFFFF";
}