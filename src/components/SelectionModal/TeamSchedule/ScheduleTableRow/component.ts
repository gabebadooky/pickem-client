import { ScheduleTableRowProps } from "./types";


export const getOpponentName = (props: ScheduleTableRowProps): string => {
    console.log(`${props.game.gameID}: ${props.team.teamID}`)
    if (props.game.awayTeamID === props.team.teamID) {
        // If Selected Team is Away
        if (props.team.league === "CFB") {
            return `@ ${props.allTeams.find(team => props.game.homeTeamID === team.teamID)?.teamName}`;

        } else {
            return `@ ${props.allTeams.find(team => props.game.homeTeamID === team.teamID)?.teamMascot}`;

        }

    } else {
        // If Selected Team is Home
        if (props.team.league === "CFB") {
            return `vs ${props.allTeams.find(team => props.game.awayTeamID === team.teamID)?.teamName}`;
        } else {
            return `vs ${props.allTeams.find(team => props.game.awayTeamID === team.teamID)?.teamMascot}`;
        }
    }
}