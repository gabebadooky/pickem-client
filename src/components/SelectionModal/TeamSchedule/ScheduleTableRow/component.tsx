import { instantiateZuluDateTime } from "../../../../utils/dates";
import { ScheduleTableRowProps } from "./types";
import { getOpponentName, renderScoreCell } from "./component";


const ScheduleTableRow = (props: ScheduleTableRowProps) => {
    const componentID: string = `${props.team.teamID}-${props.game.gameID}-schedule`;
    const zuluGameDateTime: Date = instantiateZuluDateTime(props.game.date, props.game.time);
    
    return (
        <tr
            className="w-full"
            id={`${componentID}-row`}
            key={`${componentID}-row`}
        >

            <td
                className="text-left"
                id={`${componentID}-week-${props.game.week}-date-cell`}
                key={`${componentID}-week-${props.game.week}-date-cell`}
            >
                {zuluGameDateTime.toLocaleDateString("en", { dateStyle: "short" })}
            </td>

            <td
                className="text-left"
                id={`${componentID}-week-${props.game.week}-opponent-cell`}
                key={`${componentID}-week-${props.game.week}-opponent-cell`}
            >
                {getOpponentName(props)}
            </td>

            <td
                className="text-right"
                id={`${componentID}-week-${props.game.week}-time-score-cell`}
                key={`${componentID}-week-${props.game.week}-time-score-cell`}
            >
                {
                    props.game.gameFinished
                        ?
                    renderScoreCell(props)
                        :
                    zuluGameDateTime.toLocaleTimeString("en", { timeStyle: "short" })
                }
            </td>

        </tr>
    );
}


export default ScheduleTableRow;