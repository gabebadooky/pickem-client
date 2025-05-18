import { Game } from "../types/game";
import { gameBaseURL } from "../types/espnBaseLinks";

const GameInfoModal = ({game, onClose}: { game: Game, onClose: Function}) => {
    const espnURL: string = `${gameBaseURL}/${game.espnCode}`;

    return (
        <div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id="">
            <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => onClose()}></i>
            <h1>{game.gameID}</h1>
            
            <br />
            <br />

            <span>
                {game.time}<br />
                {game.tvCoverage}<br />
                <br />
                {game.espnAwayWinPercentage} | {game.espnHomeWinPercentage}
                <br />
                <a href={espnURL}>More Info</a>
            </span>
        </div>
    )
}


export default GameInfoModal;