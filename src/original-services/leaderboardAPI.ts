import { BASE_URL } from "./baseURL";
import { LeaderboardMetrics } from "../types/leaderboard";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const getLeaderbaord =  async (): Promise<Array<LeaderboardMetrics>> => {
    const response = await fetch(`${BASE_URL}/leaderboard`);
    if (!response.ok) {
        console.log(`Error occurred during getLeaderbaord request! ${response.text}`);
        throw new Error(`Error occurred during getLeaderbaord request! ${response.text}`);
    } else {
        return response.json();
    }
}