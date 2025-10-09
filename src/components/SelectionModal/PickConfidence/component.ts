import { Game } from "../../../types/game";
import { ScoreboardEvent } from "./types";


const cfbScoreboardEndpoint: string = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";
const nflScoreboardEndpoint: string = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard";


export const formattedTeamRecord = (wins: number, losses: number, ties: number): string => {
    if (ties && ties > 0) {
        return `${wins}-${losses}-${ties}`;

    } else {
        return `${wins}-${losses}`;
        
    }
}


export const retrieveGameFromESPNHiddenAPI = async (game: Game): Promise<ScoreboardEvent | undefined> => {
    const espnScoreboardEndpoint: string = game.league === "NFL" ? nflScoreboardEndpoint : cfbScoreboardEndpoint;


    try {
        const scoreboardResponse = await fetch(espnScoreboardEndpoint);
        const scoreboardJSON = await scoreboardResponse.json();
        const events: ScoreboardEvent[] = scoreboardJSON.events;

        return events.find((event) => event.id === game.espnCode);

        /* for (let i = 0; i < events.length; i++) {
            if (events[i].id === game.espnCode) {
                return events[i]; // This return now affects the outer async function

            }

        } 

        return undefined; // Explicitly return undefined if not found */

    } catch (err) {
        console.log(`Error occurred retrieving game from ESPN API Endpoint: ${err}`);
        return undefined;

    }

}