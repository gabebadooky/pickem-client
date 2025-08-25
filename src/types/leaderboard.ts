export interface LeaderboardMetrics {
    userID: number;
    username: string;
    week: number;
    league: string;
    year: number;
    awayPowerConference: boolean;
    homePowerConference: boolean;
    awayRanking: number | null;
    homeRanking: number | null;
    points: number;
    correctPicks: number;
    incorrectPicks: number;
}