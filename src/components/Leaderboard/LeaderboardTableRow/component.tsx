import { GroupedLeaderboradEntry } from "../types";


const LeaderboardTableRow = (props: GroupedLeaderboradEntry) => {
    const componentID: string = `${props.displayName}-leaderboard-row`;


    return (
        <tr
            className="m-auto w-full"
            id={componentID}
            key={componentID}
        >

            <td
                className="text-left"
                id={`${componentID}-display-name-column`}
            >
                {props.displayName}
            </td>

            <td
                className="text-center"
                id={`${componentID}-points-column`}
            >
                {props.points}
            </td>

            <td
                className="text-center"
                id={`${componentID}-correct-column`}
            >
                {props.correct}
            </td>
            
            <td
                className="text-center"
                id={`${componentID}-incorrect-column`}
            >
                {props.incorrect}
            </td>

        </tr>
    );
}


export default LeaderboardTableRow;