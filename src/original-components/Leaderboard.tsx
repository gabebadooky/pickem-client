import { useEffect, useState } from "react";
import { seasonWeeks, weekdays } from "../original-services/formatDate";
import { getLeaderbaord } from "../original-services/leaderboardAPI";
import { LeaderboardMetrics } from "../types/leaderboard";


type groupedLeaderboardMetrics = {
    [key: string]: {
        points: number,
        correct: number,
        incorrect: number
    }
}

type sortedLeaderboardEntry = {
    displayName: string;
    points: number;
    correct: number;
    incorrect: number;
}


type Props = {
    setIsLeaderboardComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


const renderWeekOptions = () => {
    let options = [<option value={99}>Season</option>];
    for (let i = 0; i < seasonWeeks.length; i ++) {
        const formattedStartDateString: string = `${weekdays[seasonWeeks[i].start.getUTCDay()]} ${seasonWeeks[i].start.getUTCMonth() + 1}/${seasonWeeks[i].start.getUTCDate()}`;
        const formattedEndDateString: string = `${weekdays[seasonWeeks[i].end.getUTCDay()]} ${seasonWeeks[i].end.getUTCMonth() + 1}/${seasonWeeks[i].end.getUTCDate()}`;
        options.push(<option key={i} value={i}>{formattedStartDateString.toString()} - {formattedEndDateString.toString()}</option>);
    }
    return options;
}


const groupAndSortListOfLeaderboardMetrics = (allLeaderboardMetrics: LeaderboardMetrics[]) => {
    let groupedLeaderboard: groupedLeaderboardMetrics = {};

    for (let i = 0; i < allLeaderboardMetrics.length; i++) {
        const currentDisplayName: string = allLeaderboardMetrics[i].displayName;

        if (!groupedLeaderboard[currentDisplayName]) {
            groupedLeaderboard[currentDisplayName] = {
                points: allLeaderboardMetrics[i].points,
                correct: allLeaderboardMetrics[i].correctPicks,
                incorrect: allLeaderboardMetrics[i].incorrectPicks
            }
        } else {
            groupedLeaderboard[currentDisplayName] = {
                points: (groupedLeaderboard[currentDisplayName].points || 0) + allLeaderboardMetrics[i].points,
                correct: (groupedLeaderboard[currentDisplayName].correct || 0) + allLeaderboardMetrics[i].correctPicks,
                incorrect: (groupedLeaderboard[currentDisplayName].incorrect || 0) + allLeaderboardMetrics[i].incorrectPicks
            };
        }
        
    }

    const groupedArray = Object.entries(groupedLeaderboard).map((leaderboardEntry: [string, { points: number; correct: number; incorrect: number; }]) => ({
        displayName: leaderboardEntry[0],
        points: leaderboardEntry[1].points,
        correct: leaderboardEntry[1].correct,
        incorrect: leaderboardEntry[1].incorrect
    }));

    return groupedArray.sort((a, b) => b.points - a.points);
}


const Leaderboard = (props: Props) => {
    const [leaderboardWeek, setLeaderboardWeek] = useState<number>(99);
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
        <div className="h-full m-auto w-full">
            <div id="leaderboard-navbar" className="grid grid-cols-6 grid-rows-1 m-auto mb-5 mt-6">
                
                <button 
                    id="leaderboard-back-to-picks-button"
                    onClick={() => props.setIsLeaderboardComponentOpen(false)}
                >
                    <i className="fa-solid fa-arrow-left fa-xl m-auto"></i>
                </button>

                <select 
                    className="col-span-4 m-auto"
                    id="leaderboard-week-dropdown" 
                    name="leaderboard-week-dropdown"
                    onChange={(e) => setLeaderboardWeek(Number(e.currentTarget.value))}
                    value={leaderboardWeek}
                >
                    {renderWeekOptions()}
                </select>
                
                <div></div>

            </div>


            <h1 className="mb-4 mt-10 text-2xl">Overall Leaderboard</h1>
            <table className="m-auto w-[90%]" id="leaderboard-table">
                <tbody id="leaderboard-tbody">
                    <tr id="leaderboard-table-header">
                        <td className="text-left w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]">✅</td>
                        <td className="w-[20%]">❌</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics.filter(metric => ((leaderboardWeek === 99) || (metric.league === "NFL" && metric.week === leaderboardWeek - 1) || (metric.league === "CFB" && metric.week === leaderboardWeek)))).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        //console.log(`leaderboardEntry: ${leaderboardEntry.username}, ${leaderboardEntry.points}, ${leaderboardEntry.correct}, ${leaderboardEntry.incorrect}`);
                        return (
                            <tr id={`${leaderboardEntry.displayName}-overall-leaderboard-row`}>
                                <td className="text-left">{leaderboardEntry.displayName}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>


            <h1 className="mb-4 mt-10 text-2xl">NFL Leaderboard</h1>
            <table className="m-auto w-[90%]" id="nfl-leaderboard-table">
                <tbody id="nfl-leaderboard-tbody">
                    <tr id="nfl-leaderboard-table-header">
                        <td className="text-left w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]">✅</td>
                        <td className="w-[20%]">❌</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics.filter(metric => metric.league == "NFL" && (leaderboardWeek === 99 || metric.week == leaderboardWeek - 1))).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        return (
                            <tr id={`${leaderboardEntry.displayName}-nfl-overall-leaderboard-row`}>
                                <td className="text-left">{leaderboardEntry.displayName}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>


            <h1 className="mb-4 mt-10 text-2xl">CFB Leaderboard</h1>
            <table className="m-auto w-[90%]" id="cfb-leaderboard-table">
                <tbody id="cfb-leaderboard-tbody">
                    <tr id="cfb-leaderboard-table-header">
                        <td className="text-left w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]">✅</td>
                        <td className="w-[20%]">❌</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics.filter(metric => metric.league == "CFB" && (leaderboardWeek === 99 || metric.week === leaderboardWeek))).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        return (
                            <tr id={`${leaderboardEntry.displayName}-cfb-leaderboard-row`}>
                                <td className="text-left">{leaderboardEntry.displayName}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>


            <h1 className="mb-4 mt-10 text-2xl">CFB Top 25 Leaderboard</h1>
            <table className="m-auto w-[90%]" id="top25-leaderboard-table">
                <tbody id="top25--leaerboard-tbody">
                    <tr id="top25-leaderboard-table-header">
                        <td className="text-left w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]">✅</td>
                        <td className="w-[20%]">❌</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics.filter(metric => metric.league == "CFB" && (leaderboardWeek === 99 || metric.week === leaderboardWeek) && (metric.awayRanking !== null || metric.homeRanking !== null))).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        return (
                            <tr id={`${leaderboardEntry.displayName}-top25-leaderboard-row`}>
                                <td className="text-left">{leaderboardEntry.displayName}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>


            <h1 className="mb-4 mt-10 text-2xl">Power Conference Leaderboard</h1>
            <table className="m-auto w-[90%]" id="power-conference-leaderboard-table">
                <tbody id="power-conference-leaderboard-tbody">
                    <tr id="power-conference-leaderboard-table-header">
                        <td className="text-left w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]">✅</td>
                        <td className="w-[20%]">❌</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics.filter(metric => metric.league == "CFB" && (leaderboardWeek === 99 || metric.week === leaderboardWeek) && (metric.awayPowerConference || metric.homePowerConference))).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        return (
                            <tr id={`${leaderboardEntry.displayName}-power-conference-leaderboard-row`}>
                                <td className="text-left">{leaderboardEntry.displayName}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>


            <h1 className="mb-4 mt-10 text-2xl">Non-Power Conference Leaderboard</h1>
            <table className="m-auto w-[90%]" id="non-power-conference-leaderboard-table">
                <tbody id="non-power-conference-leaderboard-tbody">
                    <tr id="non-power-conference-leaderboard-table-header">
                        <td className="text-left w-[40%]">User</td>
                        <td className="w-[20%]">Total Points</td>
                        <td className="w-[20%]">✅</td>
                        <td className="w-[20%]">❌</td>
                    </tr>

                    <tr>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                        <td><hr /></td>
                    </tr>

                    {groupAndSortListOfLeaderboardMetrics(allLeaderboardMetrics.filter(metric => metric.league == "CFB" && (leaderboardWeek === 99 ||  metric.week === leaderboardWeek) && (!metric.awayPowerConference || !metric.homePowerConference))).map((leaderboardEntry: sortedLeaderboardEntry) => {
                        return (
                            <tr id={`${leaderboardEntry.displayName}-non-power-conference-leaderboard-row`}>
                                <td className="text-left">{leaderboardEntry.displayName}</td>
                                <td>{leaderboardEntry.points}</td>
                                <td>{leaderboardEntry.correct}</td>
                                <td>{leaderboardEntry.incorrect}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>

            
        </div>
    );
}

export default Leaderboard;