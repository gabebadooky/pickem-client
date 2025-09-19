import { convertGameDateToLocalTimeString } from "../../../../utils/dates";
import { gameHasKickedOff } from "../../../../utils/dates";
import { renderGameScore } from "./component";
import { GameTimeOrScoreProps } from "./types";


const GameTimeOrScore = (props: GameTimeOrScoreProps) => {
    const componentID: string = `${props.game.gameID}-time-score`;

    return (
        <div
            className="h-full m-auto text-center w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            
            {
                gameHasKickedOff(props.game.date, props.game.time)
                    ?
                <h2 className="my-2">{renderGameScore(props.game)}</h2>
                    :
                <h2 className="my-2">{convertGameDateToLocalTimeString(props.game.date, props.game.time)}</h2>
            }

        </div>
    );
}


export default GameTimeOrScore;