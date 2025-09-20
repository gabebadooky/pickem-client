import { Game } from "../../../../types/game";
import { ScoreboardEvent } from "./types";

const espnScoreboardEndpoint: string = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";


export const instantiateLocalTimestamp = (gameDate: Date, gameTime: string): string => {
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

    return zuluDateTime.toLocaleString("en", { timeStyle: "short" });
}


const retrieveGameFromESPNHiddenAPI = async (game: Game): Promise<ScoreboardEvent | undefined> => {
    try {
        const scoreboardResponse = await fetch(espnScoreboardEndpoint);
        const scoreboardJSON = await scoreboardResponse.json();
        const events: ScoreboardEvent[] = scoreboardJSON.events;

        for (let i = 0; i < events.length; i++) {
            if (events[i].id === game.espnCode) {
                return events[i]; // This return now affects the outer async function
            }
        }

        return undefined; // Explicitly return undefined if not found
    } catch {
        return undefined;
    }

}



export const renderGameScore = async (game: Game) => {
    if (game.gameFinished) {
        return `${game.awayTotalBoxScore} - ${game.homeTotalBoxScore}`;

    } else {
        const gameEntryFromESPNHiddenAPI: ScoreboardEvent | undefined = await retrieveGameFromESPNHiddenAPI(game); //await retrieveGameFromESPNHiddenAPI(game);

        if (gameEntryFromESPNHiddenAPI === undefined) {
            return "0 - 0";
            
        } else {
            if (gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].homeAway === "away") {
                const awayTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].homeAway;
                const homeTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[1].homeAway;

                return `${awayTeamScore} - ${homeTeamScore}`;
            } else {
                const awayTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[1].homeAway;
                const homeTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].homeAway;

                return `${awayTeamScore} - ${homeTeamScore}`;
            }
        }
    }
}