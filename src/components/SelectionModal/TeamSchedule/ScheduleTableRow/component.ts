import { Team } from "../../../../types/team";
import { ScheduleTableRowProps } from "./types";


export const getOpponentName = (props: ScheduleTableRowProps): string => {
    console.log(`${props.game.gameID}: ${props.team.teamID}`)
    if (props.game.awayTeamID === props.team.teamID) {
        const opponent: Team | undefined = props.allTeams.find(team => props.game.homeTeamID === team.teamID);

        // If Selected Team is Away
        if (props.team.league === "CFB") {
            return `@ ${ opponent?.ranking !== null ? `#${opponent?.ranking}` : "" } ${opponent?.teamName}`;

        } else {
            return `@ ${ opponent?.ranking !== null ? `#${opponent?.ranking}` : "" } ${opponent?.teamMascot}`;

        }

    } else {
        const opponent: Team | undefined = props.allTeams.find(team => props.game.awayTeamID === team.teamID);

        // If Selected Team is Home
        if (props.team.league === "CFB") {
            return `vs ${ opponent?.ranking !== null ? `#${opponent?.ranking}` : "" } ${opponent?.teamName}`;
        } else {
            return `vs ${ opponent?.ranking !== null ? `#${opponent?.ranking}` : "" } ${opponent?.teamMascot}`;
        }
    }
}