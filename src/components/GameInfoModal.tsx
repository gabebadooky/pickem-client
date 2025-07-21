import { Game } from "../types/game";
import { Team } from "../types/team";
import { espnCfbGameURL, cbsCfbGameURL } from "../types/baseURLs";


type Props = {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    onClose: Function;
};

const GameInfoModal = (props: Props) => {
    const espnCfbURL: string = `${espnCfbGameURL}/${props.game.espnCode}`;
    const cbsCfbURL: string = `${cbsCfbGameURL}/${props.game.cbsCode}`;
    const modalID: string = `${props.game.gameID}-info-modal`;
    const gameDate: Date = new Date(props.game.date);
    const gameYear = new Date(gameDate).getFullYear();
    const gameMonth = new Date(gameDate).getMonth();
    const gameDay = new Date(gameDate).getDate() + 1;
    const [zuluHours, zuluMinutes] = props.game.time.split(":");
    const utcDate = new Date(gameYear, gameMonth, gameDay, Number(zuluHours), Number(zuluMinutes), 0);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-10 relative text-black text-center" id={modalID}>
                
                <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => props.onClose()}></i>
                <h1>{props.awayTeam.teamName} {props.awayTeam.teamMascot} @ {props.homeTeam.teamName} {props.homeTeam.teamMascot}</h1>
                
                <div>{localDate.toLocaleString().split(", ")[1]}</div>

                <div>
                    {props.game.tvCoverage.length > 1 && `Broadcast: ${props.game.tvCoverage}`}
                </div>

                <div>
                    <p>More Details:</p>
                    <p className="text-[#34a8f8]"><a href={espnCfbURL}>ESPN</a></p>
                    <p className="text-[#34a8f8]"><a href={cbsCfbURL}>CBS</a></p>
                </div>

            </div>
        </div>
    )
}


export default GameInfoModal;
