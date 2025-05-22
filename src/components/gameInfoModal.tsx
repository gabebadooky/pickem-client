import { GameInfoProps } from "../types/gameInfoProps";
import { gameBaseURL } from "../types/espnBaseLinks";


const GameInfoModal = ({ gameInfo, onClose }: { gameInfo: GameInfoProps, onClose: Function }) => {
    const espnURL: string = `${gameBaseURL}/${gameInfo.game.espnCode}`;
    const modalID: string = `${gameInfo.game.gameID}-info`;

    return (
        <div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id={modalID}>
            <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={onClose()}></i>
            <h1>{gameInfo.awayTeam.teamName} {gameInfo.awayTeam.teamMascot} @ {gameInfo.homeTeam.teamName} {gameInfo.homeTeam.teamMascot}</h1>
            
            <br />
            <br />

            <span>
                {gameInfo.game.date.toDateString()}<br />
                {gameInfo.game.time}<br />
                {gameInfo.game.tvCoverage}<br />
                <br />
                {
                    Number(gameInfo.game.espnAwayWinPercentage) > Number(gameInfo.game.espnHomeWinPercentage)
                        &&
                    <p>{gameInfo.game.espnAwayWinPercentage} {gameInfo.awayTeam.teamName}</p>
                }
                {
                    Number(gameInfo.game.espnHomeWinPercentage) > Number(gameInfo.game.espnAwayWinPercentage)
                        &&
                    <p>{gameInfo.game.espnHomeWinPercentage} {gameInfo.homeTeam.teamName}</p>
                }
                <br />
                <a href={espnURL}>More Info (ESPN)</a>
            </span>
        </div>
    )
}


export default GameInfoModal;