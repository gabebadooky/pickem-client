import { League } from "../../types/league";
import { Team } from "../../types/team";

export const instantiateFormattedGameDate = (gameDate: Date, gameTime: string): string => {
    const gameYear: number = new Date(gameDate).getFullYear();
    const gameMonth: number = new Date(gameDate).getMonth();
    const gameDay: number = new Date(gameDate).getDate() + 1;
    
    const timeStringElements: string[] = gameTime.split(":");
    let gameHour: string = timeStringElements[0].padStart(2, "0");
    let gameMinute: string = timeStringElements[1].padStart(2, "0");
    
    if (gameHour == "04" && gameMinute == "00") {
        gameHour = "20";
    }

    const zuluDateTime: Date = new Date(Date.UTC(gameYear, gameMonth, gameDay, Number(gameHour), Number(gameMinute)));

    return zuluDateTime.toLocaleString("en", { weekday: "long", month: "long", day: "numeric" });
}


export const gameMeetsFilterCriteria = (leagueFilter: League, gameLeague: string, awayTeam: Team, homeTeam: Team): boolean => {
    switch (leagueFilter) {
        case "NFLCFB":
            return true;
        
        case "NFL":
            if (gameLeague === "NFL") {
                return true;

            } else {
                return false;

            }
        
        case "CFB":
            if (gameLeague === "CFB") {
                return true;

            } else {
                return false;

            }
        
        case "CFBT25":
            if ((gameLeague === "CFB") && (awayTeam.ranking !== null || homeTeam.ranking !== null)) {
                return true;

            } else {
                return false;

            }
        
        case "CFBP4":
            if ((gameLeague === "CFB") && (awayTeam.powerConference || homeTeam.powerConference)) {
                return true;

            } else {
                return false;

            }

        case "CFBG6":
            if ((gameLeague === "CFB") && (!awayTeam.powerConference || !homeTeam.powerConference)) {
                return true;

            } else {
                return false;
                
            }
            
        default:
            return false;

    }
    
}