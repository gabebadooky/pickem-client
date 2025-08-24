export interface LeaderboardRow {
    userID: number;
    week: number;
    league: string;
    year: number;
    awayPowerConference: boolean;
    homePowerConference: boolean;
    awayRanking: number | null;
    homeRanking: number | null;
    points: number;
}