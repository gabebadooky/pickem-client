import { Game } from "../../../../types/game";
import { retrieveGameFromESPNHiddenAPI } from "../component.ts";
import { ScoreboardEvent } from "../types";


export const renderGameScore = async (game: Game): Promise<string> => {
    if (game.gameFinished) {
        return `Final: ${game.awayTotalBoxScore} - ${game.homeTotalBoxScore}`;

    } else {
        const gameEntryFromESPNHiddenAPI: ScoreboardEvent | undefined = await retrieveGameFromESPNHiddenAPI(game); //await retrieveGameFromESPNHiddenAPI(game);

        if (gameEntryFromESPNHiddenAPI === undefined) {
            return "0 - 0";
            
        } else {
            const gameComplete: boolean = gameEntryFromESPNHiddenAPI.competitions[0].status.type.completed;

            if (gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].homeAway === "away") {
                const awayTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].score;
                const homeTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[1].score;

                if (gameComplete) {
                    return `Final: ${awayTeamScore} - ${homeTeamScore}`;

                } else {
                    const gameDetail: string = gameEntryFromESPNHiddenAPI.competitions[0].status.type.detail;
                    return `${awayTeamScore} - ${homeTeamScore} | ${gameDetail}`;

                }
            } else {
                const awayTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[1].score;
                const homeTeamScore: string = gameEntryFromESPNHiddenAPI.competitions[0].competitors[0].score;

                if (gameComplete) {
                    return `Final: ${awayTeamScore} - ${homeTeamScore}`;

                } else {
                    const gameDetail: string = gameEntryFromESPNHiddenAPI.competitions[0].status.type.detail;
                    return `${awayTeamScore} - ${homeTeamScore} | ${gameDetail}`;

                }

            }
        }
    }
}