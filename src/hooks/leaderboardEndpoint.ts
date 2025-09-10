import { LeaderboardMetrics } from "../types/leaderboard";
import { pickemEndpointURL } from "../types/baseURLs";

export const CallLeaderboardEndpoint =  async (): Promise<Array<LeaderboardMetrics>> => {
    const endpointURL: string = `${pickemEndpointURL}/leaderboard`;
    const response = await fetch(endpointURL);
    const nullLeaderboardMetrics: LeaderboardMetrics[] = [];

    try {
        if (!response.ok) {
            return nullLeaderboardMetrics;
        } else {
            return response.json();
        }
    } catch {
        return nullLeaderboardMetrics;
    }
}