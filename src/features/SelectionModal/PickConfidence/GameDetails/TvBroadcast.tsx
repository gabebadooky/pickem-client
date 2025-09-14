import { Game } from "../../../../types/game";


const TvBroadcast = (game: Game) => {
    return (
        <div
            className="text-center"
            id={`${game.gameID}-broadcast-div`}
            key={`${game.gameID}-broadcast-div`}
        >
            {
                game.tvCoverage.length > 1
                    ?
                <h3 className="my-2">Broadcast {game.tvCoverage}</h3>
                    :
                <h3 className="my-2">Broadcast: N/A</h3>
            }
        </div>
    );
}


export default TvBroadcast;