import { Game } from "../types/game";
import { Team } from "../types/team";
import { espnGameURL, cbsGameURL } from "../types/baseURLs";


type Props = {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    onClose: Function;
};

const GameInfoModal = (props: Props) => {
    const espnURL: string = `${espnGameURL}/${props.game.espnCode}`;
    const cbsURL: string = `${cbsGameURL}/${props.game.cbsCode}`;
    const modalID: string = `${props.game.gameID}-info`;
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
                
                <br />
                <br />

                <span>
                    {/*{props.game.date.getMonth().toString()}/{props.game.date.getDay().toString()}/{props.game.date.getFullYear().toString()}<br /> */}
                    {localDate.toLocaleString().split(", ")[1]}
                    <br />
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
                    <p>More Details:</p>
                    <p className="text-[#34a8f8]"><a href={espnURL}>ESPN</a></p>
                    <p className="text-[#34a8f8]"><a href={cbsURL}>CBS</a></p>
                </span>
            </div>
        </div>
    )
}


export default GameInfoModal;
