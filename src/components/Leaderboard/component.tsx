import { useEffect, useState } from "react";
import { GroupedLeaderboradEntry, LeaderboardProps } from "./types";
import { LeaderboardMetrics } from "../../types/leaderboard";
import { callLeaderboardEndpoint } from "../../hooks/leaderboardEndpoints";
import { filterGroupAndSortLeaderboardResults, leagueLongDescriptions } from "./component";
import { LeaderboardTableRow } from "./LeaderboardTableRow";


const Leaderboard = (props: LeaderboardProps) => {
    const [leaderboardResults, setLeaderboardResults] = useState<LeaderboardMetrics[]>([]);
    const componentID: string = "leaderboard-component";


    useEffect(() => {
        if (leaderboardResults.length === 0) {
            callLeaderboardEndpoint().then(setLeaderboardResults);
        }
    }, []);


    return (
        <div
            className="h-full m-auto w-full"
            id={`${componentID}-div`}
        >

            <h1
                className="m-auto text-2xl"
                id={`${componentID}-header`}
            >
                Week {props.weekFilter} {leagueLongDescriptions[props.leagueFilter]} Picks Leaderbaord
            </h1>

            <table
                className="m-auto w-full"
                id={`${componentID}-table`}
            >

                <tbody id={`${componentID}-table-body`}>
                    
                    <tr className="border-b" id={`${componentID}-table-header`}>
                        <th className="text-left" id={`${componentID}-user-column-header`}>User</th>
                        <th className="text-center" id={`${componentID}-points-column-header`}>Total Points</th>
                        <th className="text-center" id={`${componentID}-correct-column-header`}>✅</th>
                        <th className="text-center" id={`${componentID}-incorrect-column-header`}>❌</th>
                    </tr>

                    {filterGroupAndSortLeaderboardResults(leaderboardResults, props.leagueFilter, props.weekFilter).map((entry: GroupedLeaderboradEntry) => {
                        return (
                            <LeaderboardTableRow
                                key={`${entry.displayName}-leaderboard-table-row-component`}
                                displayName={entry.displayName}
                                points={entry.points}
                                correct={entry.correct}
                                incorrect={entry.incorrect}
                            />
                        );
                    })}
                    
                </tbody>

            </table>
        </div>
    );
}


export default Leaderboard;