import { useEffect, useState } from "react";
import { getLeaderbaord } from "../services/leaderboardAPI";
import { LeaderboardMetrics } from "../types/leaderboard";


type groupedLeaderboardMetrics = {
    [key: string]: {
        points: number,
        correct: number,
        incorrect: number
    }
}

type sortedLeaderboardEntry = {
    username: string;
    points: number;
    correct: number;
    incorrect: number;
}


type Props = {
    setIsLeaderboardComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


const groupAndSortListOfLeaderboardMetrics = (allLeaderboardMetrics: LeaderboardMetrics[]) => {
    let groupedLeaderboard: groupedLeaderboardMetrics = {};

    for (let i = 0; i < allLeaderboardMetrics.length; i++) {
        const currentUsername: string = allLeaderboardMetrics[i].username;

        if (!groupedLeaderboard[currentUsername]) {
            groupedLeaderboard[currentUsername] = {
                points: allLeaderboardMetrics[i].points,
                correct: allLeaderboardMetrics[i].correctPicks,
                incorrect: allLeaderboardMetrics[i].incorrectPicks
            }
        } else {
            groupedLeaderboard[currentUsername] = {
                points: (groupedLeaderboard[currentUsername].points || 0) + allLeaderboardMetrics[i].points,
                correct: (groupedLeaderboard[currentUsername].correct || 0) + allLeaderboardMetrics[i].correctPicks,
                incorrect: (groupedLeaderboard[currentUsername].incorrect || 0) + allLeaderboardMetrics[i].incorrectPicks
            };
        }
        
    }

    const groupedArray = Object.entries(groupedLeaderboard).map((leaderboardEntry: [string, { points: number; correct: number; incorrect: number; }]) => ({
        username: leaderboardEntry[0],
        points: leaderboardEntry[1].points,
        correct: leaderboardEntry[1].correct,
        incorrect: leaderboardEntry[1].incorrect
    }));

    return groupedArray.sort((a, b) => b.points - a.points);
}


const Leaderboard = (props: Props) => {
    const [leaderboardLeague, setLeaderboardLeague] = useState<string>("CFBNFL");
    const [allLeaderboardMetrics, setAllLeaderboardMetrics] = useState<LeaderboardMetrics[]>([]);


    useEffect(() => {
        async function getAndSetLeaderboard() {
            props.setIsLoading(true);
            try {
                getLeaderbaord().then(setAllLeaderboardMetrics);
            } finally {
                props.setIsLoading(false);
            }
        }

        getAndSetLeaderboard();
    }, []);

    return (
        <div className="m-auto w-full">
            <div id="leaderboard-navbar" className="grid grid-cols-3 grid-rows-1 m-auto mb-5 mt-6">
                
                <button 
                    id="leaderboard-back-to-picks-button"
                    onClick={() => props.setIsLeaderboardComponentOpen(false)}
                >
                    <i className="fa-solid fa-arrow-left fa-xl m-auto"></i>
                </button>

                <select className="m-auto text-l text-center w-[82%]" id="leaderboard-league-dropdown-input" name="league-dropdown"
                    value={leaderboardLeague}
                    onChange={(e) => setLeaderboardLeague(e.currentTarget.value)}
                >
                    <option value="CFBNFL">All</option>
                    <option value="NFL">NFL</option>
                    <option value="CFB">CFB (All)</option>
                    <option value="CFBT25">CFB Top 25</option>
                    <option value="CFBP4">CFB Power Conference</option>
                    <option value="CFBG6">CFB Non-Power Conference</option>
                </select>
                
                <div></div>

            </div>

            <h1 className="mb-4 mt-10 text-2xl">Overall Leaderboard</h1>

            <table className="m-auto w-[90%]" id="leaderboard-table">
                <tbody id="leaderboard-tbody">
                    <tr id="leaderboard-table-header">
                        <td className="w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]"># Correct</td>
                        <td className="w-[20%]"># Incorrect</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        //console.log(`leaderboardEntry: ${leaderboardEntry.username}, ${leaderboardEntry.points}, ${leaderboardEntry.correct}, ${leaderboardEntry.incorrect}`);
                        return (
                            <tr id={`${leaderboardEntry.username}-leaderboard-row`}>
                                <td>{leaderboardEntry.username}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>

            {/*
                <h1 className="text-3xl">Under Construction!!</h1>
                <button
                    className="border-1 border-white flex h-full items-center justify-center mt-15 mx-auto px-5 py-2 rounded-lg"
                    id="back-home-button"
                    onClick={() => props.setIsLeaderboardComponentOpen(false)}
                >
                    Back
                </button>
            */}
            
        </div>
    );
}

export default Leaderboard;