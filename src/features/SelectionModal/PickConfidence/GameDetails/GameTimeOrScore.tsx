import { Game } from "../../../types/game";
import { convertGameDateToLocalTimeString } from "../../../utils/dates";
import { gameHasKickedOff } from "../ConfidenceRadioOption/utils";

type GameTimeOrScoreProps = {
    game: Game;
}

const GameTimeOrScore = (props: GameTimeOrScoreProps) => {
    return (
        <div
            className="text-center"
            id={`${props.game.gameID}-time-score-div`}
            key={`${props.game.gameID}-time-score-div`}
        >
            
            {
                gameHasKickedOff(props.game.date, props.game.time)
                    ?
                <h2 className="my-2">{props.game.awayTotalBoxScore} - {props.game.homeTotalBoxScore}</h2>
                    :
                <h2 className="my-2">{convertGameDateToLocalTimeString(props.game.date, props.game.time)}</h2>
            }

        </div>
    );
}


export default GameTimeOrScore;