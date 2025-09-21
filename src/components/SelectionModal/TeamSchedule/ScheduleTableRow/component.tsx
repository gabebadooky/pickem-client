import { instantiateZuluDateTime } from "../../../../utils/dates";
import { ScheduleTableRowProps } from "./types";
import { getOpponentName } from "./component";
import { ScoreSpan } from "./ScoreSpan";


const ScheduleTableRow = (props: ScheduleTableRowProps) => {
    const componentID: string = `${props.team.teamID}-${props.game.gameID}-schedule`;
    const zuluGameDateTime: Date = instantiateZuluDateTime(props.game.date, props.game.time);
    
    return (
        <tr
            className="border-1 w-full"
            id={`${componentID}-row`}
            key={`${componentID}-row`}
        >

            <td
                className="text-left top-0"
                id={`${componentID}-week-${props.game.week}-date-cell`}
                key={`${componentID}-week-${props.game.week}-date-cell`}
            >
                {zuluGameDateTime.toLocaleDateString("en", { month: "numeric", day: "numeric" })}
            </td>

            <td
                className="px-1 text-left top-0"
                id={`${componentID}-week-${props.game.week}-opponent-cell`}
                key={`${componentID}-week-${props.game.week}-opponent-cell`}
            >
                {getOpponentName(props)}
            </td>

            <td
                className="text-right top-0"
                id={`${componentID}-week-${props.game.week}-time-score-cell`}
                key={`${componentID}-week-${props.game.week}-time-score-cell`}
            >
                {
                    props.game.gameFinished
                        ?
                    <ScoreSpan allTeams={props.allTeams} game={props.game} team={props.team} />
                        :
                    zuluGameDateTime.toLocaleTimeString("en", { timeStyle: "short" })
                }
            </td>

        </tr>
    );
}


export default ScheduleTableRow;