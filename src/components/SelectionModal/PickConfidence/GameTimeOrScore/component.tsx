import { useEffect, useState } from "react";
import { gameHasKickedOff } from "../../../../utils/dates";
import { instantiateLocalTimestamp, renderGameScore } from "./component";
import { GameTimeOrScoreProps } from "./types";


const GameTimeOrScore = (props: GameTimeOrScoreProps) => {
    const [liveGameScore, setLiveGameScore] = useState<string>("");
    const componentID: string = `${props.game.gameID}-time-score`;


    useEffect(() => {
        renderGameScore(props.game).then(setLiveGameScore);
    }, []);
    

    return (
        <div
            className="h-full m-auto text-center w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            
            {
                gameHasKickedOff(props.game.date, props.game.time)
                    ?
                <h2 id={`${componentID}-header`} key={`${componentID}-header`}>
                    {liveGameScore}
                </h2>
                    :
                <h2 id={`${componentID}-header`} key={`${componentID}-header`}>
                    {instantiateLocalTimestamp(props.game.date, props.game.time)}
                </h2>
            }

        </div>
    );
}


export default GameTimeOrScore;