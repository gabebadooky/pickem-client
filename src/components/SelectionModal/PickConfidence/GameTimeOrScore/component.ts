import { Game } from "../../../../types/game";
import { retrieveGameFromESPNHiddenAPI } from "../component";
import { ScoreboardEvent } from "../types";


export const renderGameScore = async (game: Game): Promise<string> => {
    if (game.gameFinished) {
        return `${game.awayTotalBoxScore} - ${game.homeTotalBoxScore}`;

    } else {
        const gameEntryFromESPNHiddenAPI: ScoreboardEvent | undefined = await retrieveGameFromESPNHiddenAPI(game); //await retrieveGameFromESPNHiddenAPI(game);

        if (gameEntryFromESPNHiddenAPI === undefined) {
            return "0 - 0";
            
        } else {
            if (gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].homeAway === "away") {
                const awayTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].score;
                const homeTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[1].score;

                return `${awayTeamScore} - ${homeTeamScore}`;
            } else {
                const awayTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[1].score;
                const homeTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].score;

                return `${awayTeamScore} - ${homeTeamScore}`;
            }
        }
    }
}