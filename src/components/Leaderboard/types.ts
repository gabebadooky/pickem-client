import { League } from "../../types/league";


export type LeaderboardProps = {
    leagueFilter: League;
    weekFilter: number;
}


export type GroupedLeaderboradEntry = {
    displayName: string;
    points: number;
    correct: number;
    incorrect: number;
}