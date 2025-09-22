import { useEffect, useState } from "react";
import { LeaderboardProps } from "./types";
import { LeaderboardMetrics } from "../../types/leaderboard";
import { callLeaderboardEndpoint } from "../../hooks/leaderboardEndpoints";


const Leaderboard = (props: LeaderboardProps) => {
    const [leaderboardResults, setLeaderboardResults] = useState<LeaderboardMetrics[]>([]);
    const componentID: string = "leaderboard-component";


    useEffect(() => {
        callLeaderboardEndpoint().then(setLeaderboardResults);
    }, []);


    return (
        <div
            className="h-full m-auto w-full"
            id={`${componentID}-div`}
        >
            <table
                className="m-auto w-full"
                id={`${componentID}-header`}
            >
                <th id={`${componentID}-table-header`}>
                    <td className="text-left" id={`${componentID}-user-column-header`}>User</td>
                    <td className="text-center" id={`${componentID}-points-column-header`}>Total Points</td>
                    <td className="text-center" id={`${componentID}-correct-column-header`}>✅</td>
                    <td className="text-center" id={`${componentID}-incorrect-column-header`}>❌</td>
                </th>

                <tbody id={`${componentID}-table-body`}>
                    
                </tbody>
            </table>
        </div>
    );
}


export default Leaderboard;