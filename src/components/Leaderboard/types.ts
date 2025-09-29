import { League } from "../../types/league";
import { Team } from "../../types/team";
import { User } from "../../types/user";


export type LeaderboardProps = {
    allTeams: Team[];
    allUsers: User[];
    leagueFilter: League;
    weekFilter: number;
}


export type GroupedLeaderboradEntry = {
    displayName: string;
    points: number;
    correct: number;
    incorrect: number;
}