import { ScheduleTableRowProps } from "./types";


export const ScoreSpan = (props: ScheduleTableRowProps) => {
    const gameScore: string = `${props.game.awayTotalBoxScore}-${props.game.homeTotalBoxScore}`;

    if (props.game.awayTeamID === props.team.teamID) {
        // If Selected Team was the Away Team
        
        if (props.game.awayTotalBoxScore > props.game.homeTotalBoxScore) {
            // If Away Team Won
            return <span className="text-green-600 top-0">W {gameScore}</span>;

        } else {
            // Home Team Won
            return <span className="text-red-600 top-0">L {gameScore}</span>;

        }

    } else {
        // If Selected Team was the Home Team

        if (props.game.awayTotalBoxScore > props.game.homeTotalBoxScore) {
            // If Away Team Won
            return <span className="text-red-600 top-0">L {gameScore}</span>;

        } else {
            // Home Team Won
            return <span className="text-green-600 top-0">W {gameScore}</span>;

        }

    }
 
}