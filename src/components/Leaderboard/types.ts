import { League } from "../../types/league";


export type LeaderboardProps = {
    leagueFilter: League;
    weekFilter: string;
}


export type GroupedLeaderboradEntry = {
    displayName: string;
    points: number;
    correct: number;
    incorrect: number;
}