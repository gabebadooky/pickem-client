import { LeaderboardMetrics } from "../../types/leaderboard";
import { League } from "../../types/league";
import { instantiateZuluDateTime, seasonWeeks } from "../../utils/dates";
import { GroupedLeaderboradEntry } from "./types";


export const leagueLongDescriptions = {
    "NFLCFB": "All",
    "NFL": "NFL",
    "CFB": "CFB",
    "CFBT25": "CFB Top 25",
    "CFBP4": "CFB Power Conference",
    "CFBG6": "CFB Non-Power Conference"
}


export const instantiateAbbreviatedWeekLabel = (weekFilter: number) => {
    const weekFilterStartDate = seasonWeeks[weekFilter].start;
    const weekFilterEndDate = seasonWeeks[weekFilter].end;

    return `${weekFilterStartDate.getMonth() + 1}/${weekFilterStartDate.getDate() + 1} - ${weekFilterEndDate.getMonth() + 1}/${weekFilterEndDate.getDate() + 1}`;
}


const filterByLeague = (leaderboardResults: LeaderboardMetrics[], leagueFilter: League): LeaderboardMetrics[] => {
    switch (leagueFilter) {
        case "NFLCFB":
            return leaderboardResults;

        case "NFL":
            return leaderboardResults.filter((result) => result.league === "NFL");
        
        case "CFB":
            return leaderboardResults.filter((result) => result.league === "CFB");

        case "CFBT25":
            return leaderboardResults.filter((result) => 
                (result.league === "CFB")
                    &&
                (result.awayRanking !== null || result.homeRanking !== null)
            );
        
        case "CFBP4":
            return leaderboardResults.filter((result) => 
                (result.league === "CFB")
                    &&
                (result.awayPowerConference || result.homePowerConference)
            );
        
        case "CFBG6":
            return leaderboardResults.filter((result) => 
                (result.league === "CFB")
                    &&
                (!result.awayPowerConference || !result.homePowerConference)
            );

        default:
            return leaderboardResults;
    }
}


const filterByWeek = (leaderboardResults: LeaderboardMetrics[], week: number): LeaderboardMetrics[] => {
    return leaderboardResults.filter((result) => 
        (result.league === "NFL" && result.week === week - 1)
            ||
        (result.league === "CFB" && result.week === week)
    );
}


const groupByUser = (leaderboardResults: LeaderboardMetrics[]): GroupedLeaderboradEntry[] => {
    let groupedLeaderboard: GroupedLeaderboradEntry[] = [];

    leaderboardResults.map((result) => {
        const entryIndex: number = groupedLeaderboard.findIndex(entry => entry.displayName === result.displayName);
        //const userEntryExists: GroupedLeaderboradEntry | undefined = groupedLeaderboard.find(entry => entry.displayName === result.displayName) || undefined;
        //console.log(`displayName: ${result.displayName} | points: ${result.points || -999}`);
        if (entryIndex !== -1) {
            // aggregate points, correct, incorrect
            groupedLeaderboard[entryIndex] = {
                ...groupedLeaderboard[entryIndex],
                displayName: result.displayName,
                points: groupedLeaderboard[entryIndex].points + result.points,
                correct: groupedLeaderboard[entryIndex].correct + result.correctPicks,
                incorrect: groupedLeaderboard[entryIndex].incorrect + result.incorrectPicks
            }

        } else {
            groupedLeaderboard.push({
                displayName: result.displayName,
                points: result.points,
                correct: result.correctPicks,
                incorrect: result.incorrectPicks
            });

        }

    });

    return groupedLeaderboard.sort((a, b) => b.points - a.points);
}


export const filterGroupAndSortLeaderboardResults = (leaderboardResults: LeaderboardMetrics[], leagueFilter: League, weekFilter: number) => {
    return groupByUser(filterByWeek(filterByLeague(leaderboardResults, leagueFilter), weekFilter));
}