import { Game } from "../types/game";
import { Team } from "../types/team";
import { gameBaseURL } from "../types/espnBaseLinks";


type Props = {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    onClose: Function;
};

const GameInfoModal = (props: Props) => {
    const espnURL: string = `${gameBaseURL}/${props.game.espnCode}`;
    const modalID: string = `${props.game.gameID}-info`;

    return (
        <div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id={modalID}>
            <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={props.onClose()}></i>
            <h1>{props.awayTeam.teamName} {props.awayTeam.teamMascot} @ {props.homeTeam.teamName} {props.homeTeam.teamMascot}</h1>
            
            <br />
            <br />

            <span>
                {props.game.date.toDateString()}<br />
                {props.game.time}<br />
                {props.game.tvCoverage}<br />
                <br />
                {
                    Number(props.game.espnAwayWinPercentage) > Number(props.game.espnHomeWinPercentage)
                        &&
                    <p>{props.game.espnAwayWinPercentage} {props.awayTeam.teamName}</p>
                }
                {
                    Number(props.game.espnHomeWinPercentage) > Number(props.game.espnAwayWinPercentage)
                        &&
                    <p>{props.game.espnHomeWinPercentage} {props.homeTeam.teamName}</p>
                }
                <br />
                <a href={espnURL}>More Info (ESPN)</a>
            </span>
        </div>
    )
}


export default GameInfoModal;