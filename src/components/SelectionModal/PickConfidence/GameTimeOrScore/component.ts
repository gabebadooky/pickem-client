import { Game } from "../../../../types/game";
import { ScoreboardEvent } from "./types";

const espnScoreboardEndpoint: string = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";


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