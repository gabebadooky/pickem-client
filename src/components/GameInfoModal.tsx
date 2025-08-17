import { Game } from "../types/game";
import { Team } from "../types/team";
import { espnCfbGameURL, espnNflGameURL, foxCfbURL, foxNflURL } from "../types/baseURLs";


type Props = {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    onClose: Function;
};

const GameInfoModal = (props: Props) => {
    const espnGameURL: string = props.game.league === "CFB" ? `${espnCfbGameURL}/${props.game.espnCode}` : `${espnNflGameURL}/${props.game.espnCode}`;
    const cbsGameURL: string = props.game.league === "CFB" ? `https://www.cbssports.com/college-football/odds/FBS/2025/regular/week-${props.game.week}` : `https://www.cbssports.com/nfl/gametracker/live/${props.game.cbsCode}`;
    const foxGameURL: string = props.game.league === "CFB" ? `${foxCfbURL}/${props.game.foxCode}` : `${foxNflURL}/${props.game.foxCode}`;
    const modalID: string = `${props.game.gameID}-info-modal`;
    const gameDate: Date = new Date(props.game.date);
    const gameYear = new Date(gameDate).getFullYear();
    const gameMonth = new Date(gameDate).getMonth();
    const gameDay = new Date(gameDate).getDate() + 1;
    const [zuluHours, zuluMinutes] = props.game.time.split(":");
    const utcDate = new Date(gameYear, gameMonth, gameDay, Number(zuluHours), Number(zuluMinutes), 0);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    
    console.log(`espnGameURL: ${espnGameURL}`);
    console.log(`cbsGameURL: ${cbsGameURL}`);
    console.log(`foxGameURL: ${foxGameURL}`);

    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-5 relative rounded-xl text-black text-center w-[80%]" id={modalID}>
                
                <i className="fa-solid fa-2xl fa-rectangle-xmark absolute top-4 right-2" onClick={() => props.onClose()}></i>
                <h1 className="font-extrabold mt-4 text-lg">{props.awayTeam.teamName} {props.awayTeam.teamMascot} @ {props.homeTeam.teamName} {props.homeTeam.teamMascot}</h1>
                
                <div className="text-xs">{localDate.toLocaleString().split(", ")[1]}</div>

                <div className="mb-4 text-xs">
                    {props.game.tvCoverage.length > 1 && `Broadcast: ${props.game.tvCoverage}`}
                </div>

                <div className="text-base">
                    <p className="">More Details:</p>
                    <p className="pb-1 text-[#34a8f8]"><a href={espnGameURL}>ESPN</a></p>
                    <p className="pb-1 text-[#34a8f8]"><a href={cbsGameURL}>CBS</a></p>
                    <p className="text-[#34a8f8]"><a href={foxGameURL}>FOX</a></p>
                </div>

            </div>
        </div>
    )
}


export default GameInfoModal;
