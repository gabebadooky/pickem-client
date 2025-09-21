import { ScheduleTableRowProps } from "./types";


export const getOpponentName = (props: ScheduleTableRowProps): string => {
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


export const renderScoreCell = (props: ScheduleTableRowProps): string => {
    const gameScore: string = `${props.game.awayTotalBoxScore}-${props.game.homeTotalBoxScore}`;

    if (props.game.awayTeamID === props.team.teamID) {
        // If Selected Team was the Away Team
        
        if (props.game.awayTotalBoxScore > props.game.homeTotalBoxScore) {
            // If Away Team Won
            return `W ${gameScore}`;

        } else {
            // Home Team Won
            return `L ${gameScore}`;

        }

    } else {
        // If Selected Team was the Home Team

        if (props.game.awayTotalBoxScore > props.game.homeTotalBoxScore) {
            // If Away Team Won
            return `L ${gameScore}`;

        } else {
            // Home Team Won
            return `W ${gameScore}`;

        }

    }
 
}