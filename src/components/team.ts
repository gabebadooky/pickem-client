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
    teamLogoUrl: string;
    primaryColor: string;
    alternateColor: string;
    overallWins: number;
    overallLosses: number;
    overallTies: number;
    conferenceWins: number;
    conferenceLosses: number;
    conferenceTies: number;
}

export const NullTeam: Team = {
    teamID: "teamID",
    cbsCode: "",
    espnCode: "",
    foxCode: "",
    vegasCode: "",
    conferenceCode: 0,
    conferenceName: "",
    divisionName: "",
    teamName: "teamName",
    teamMascot: "teamMascot",
    powerConference: false,
    teamLogoUrl: "",
    primaryColor: "000000",
    alternateColor: "ffffff",
    overallWins: 0,
    overallLosses: 0,
    overallTies: 0,
    conferenceWins: 0,
    conferenceLosses: 0,
    conferenceTies: 0
}