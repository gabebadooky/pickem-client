import { LeaderboardMetrics } from "../../types/leaderboard";
import { League } from "../../types/league";
import { GroupedLeaderboradEntry } from "./types";


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


const groupByUser = (leaderboardResults: LeaderboardMetrics[]) => {
    let groupedLeaderboard: GroupedLeaderboradEntry[] = [];

    leaderboardResults.map((result) => {
        const userEntryExists: GroupedLeaderboradEntry | undefined = groupedLeaderboard.find(entry => entry.displayName === result.displayName) || undefined;

        if (userEntryExists) {
            // aggregate points, correct, incorrect
            groupedLeaderboard.map((entry) => 
                entry.displayName === result.displayName
                    ?
                {
                    ...entry,
                    displayName: entry.displayName,
                    points: userEntryExists.points + entry.points,
                    correct: userEntryExists.correct + entry.correct,
                    incorrect: userEntryExists.incorrect + entry.incorrect
                }
                    :
                entry
            );

        } else {
            groupedLeaderboard.push({
                displayName: result.displayName,
                points: result.points,
                correct: result.correctPicks,
                incorrect: result.incorrectPicks
            });

        }

        return groupedLeaderboard.sort((a, b) => b.points - a.points);

    });
}


export const filterGroupAndSortLeaderboardResults = (leaderboardResults: LeaderboardMetrics[], leagueFilter: League, weekFilter: number) => {
    return groupByUser(filterByWeek(filterByLeague(leaderboardResults, leagueFilter), weekFilter));
}