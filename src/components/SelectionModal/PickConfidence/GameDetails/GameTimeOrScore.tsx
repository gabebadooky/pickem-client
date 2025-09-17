import { Game } from "../../../../types/game";
import { convertGameDateToLocalTimeString } from "../../../../utils/dates";
import { gameHasKickedOff } from "../../../../utils/dates";
import { renderGameScore } from "./utils";


const GameTimeOrScore = (game: Game) => {
    return (
        <div
            className="h-full m-auto text-center w-full"
            id={`${game.gameID}-time-score-div`}
            key={`${game.gameID}-time-score-div`}
        >
            
            {
                gameHasKickedOff(game.date, game.time)
                    ?
                <h2 className="my-2">{renderGameScore(game)}</h2>
                    :
                <h2 className="my-2">{convertGameDateToLocalTimeString(game.date, game.time)}</h2>
            }

        </div>
    );
}


export default GameTimeOrScore;