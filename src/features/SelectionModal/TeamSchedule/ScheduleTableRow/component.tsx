import { convertGameDateToLocalTimeString, convertGameDateToMonthDayYearFormat } from "../../../../utils/dates";
import { ScheduleTableRowProps } from "./types";
import { getOpponentName } from "./utils";


const ScheduleTableRow = (props: ScheduleTableRowProps) => {
    const componentID: string = `${props.team.teamID}-${props.game.gameID}-schedule`;

    return (
        <tr
            className="w-full"
            id={`${componentID}-row`}
            key={`${componentID}-row`}
        >

            <td
                className="text-left"
                id={`${componentID}-week-${props.game.week}-date-cell`}
                key={`${componentID}-opponent-week-${props.game.week}-date-cell`}
            >
                {convertGameDateToMonthDayYearFormat(props.game.date)}
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
                id={`${componentID}-week-${props.game.week}-date-cell`}
                key={`${componentID}-opponent-week-${props.game.week}-date-cell`}
            >
                {convertGameDateToLocalTimeString(props.game.date, props.game.time)}
            </td>

        </tr>
    );
}


export default ScheduleTableRow;