import { Game } from "../../../../types/game";

type TvBroadcast = {
    game: Game;
}

const TvBroadcast = (props: TvBroadcast) => {
    return (
        <div
            className="text-center"
            id={`${props.game.gameID}-broadcast-div`}
            key={`${props.game.gameID}-broadcast-div`}
        >
            {
                props.game.tvCoverage.length > 1
                    ?
                <h3 className="my-2">Broadcast {props.game.tvCoverage}</h3>
                    :
                <h3 className="my-2">Broadcast: N/A</h3>
            }
        </div>
    );
}


export default TvBroadcast;