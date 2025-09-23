import { useEffect, useState } from "react";
import { GroupedLeaderboradEntry, LeaderboardProps } from "./types";
import { LeaderboardMetrics } from "../../types/leaderboard";
import { callLeaderboardEndpoint } from "../../hooks/leaderboardEndpoints";
import { filterGroupAndSortLeaderboardResults, instantiateAbbreviatedWeekLabel, leagueLongDescriptions } from "./component";
import { LeaderboardTableRow } from "./LeaderboardTableRow";
import { calculateCurrentWeek } from "../../utils/dates";


const Leaderboard = (props: LeaderboardProps) => {
    const [leaderboardResults, setLeaderboardResults] = useState<GroupedLeaderboradEntry[]>([]);
    const componentID: string = "leaderboard-component";


    useEffect(() => {
        callLeaderboardEndpoint().then((unsortedResults: LeaderboardMetrics[]) => {
            setLeaderboardResults(filterGroupAndSortLeaderboardResults(unsortedResults, props.leagueFilter, props.weekFilter))
        });
    }, [props.leagueFilter, props.weekFilter]);


    return (
        <div
            className="h-full m-auto w-full"
            id={`${componentID}-div`}
        >

            <h1
                className="m-auto text-xl"
                id={`${componentID}-header`}
            >
                {instantiateAbbreviatedWeekLabel(props.weekFilter)} {leagueLongDescriptions[props.leagueFilter]} Picks Leaderboard
            </h1>

            {
                leaderboardResults.length > 0
                    &&
                props.weekFilter < calculateCurrentWeek()
                    &&
                <h2 className="text-m">Winner: {leaderboardResults[0].displayName}</h2>
            }

            {
                leaderboardResults.length > 0
                    &&
                props.weekFilter === calculateCurrentWeek()
                    &&
                <h2 className="text-m">Leader: {leaderboardResults[0].displayName}</h2>
            }

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

                    {leaderboardResults.map((entry: GroupedLeaderboradEntry) => {
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

            { leaderboardResults.length === 0 && <p>No results yet!</p> }

        </div>
    );
}


export default Leaderboard;