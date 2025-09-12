import { ScheduleTableRowProps } from "./types";


export const getOpponentName = (props: ScheduleTableRowProps) => {
    if (props.game.awayTeamID === props.team.teamID) {
        if (props.team.league === "CFB") {
            return `@ ${props.allTeams.find(team => props.game.homeTeamID === team.teamID)?.teamName}`;
        } else {
            return `vs ${props.allTeams.find(team => props.game.homeTeamID === team.teamID)?.teamMascot}`;
        }

    } else {
        if (props.team.league === "CFB") {
            return `vs ${props.allTeams.find(team => props.game.awayTeamID === team.teamID)?.teamMascot}`;
        } else {
            return `@ ${props.allTeams.find(team => props.game.homeTeamID === team.teamID)?.teamName}`;
        }
    }
}