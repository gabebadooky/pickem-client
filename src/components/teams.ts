export interface Team {
    teamID: string;
    cbsCode: string;
    espnCode: string;
    foxCode: string;
    vegasCode: string;
    conferenceCode: number;
    conferenceName: string;
    divisionName: string;
    teamName: string;
    teamMascot: string;
    powerConference: boolean;
    team_logo_url: string;
    primaryColor: string;
    alternateColor: string;
    overallWins: number;
    overallLosses: number;
    overallTies: number;
    conferenceWins: number;
    conferenceLosses: number;
    conferenceTies: number;
}