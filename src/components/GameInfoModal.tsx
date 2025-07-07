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

    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-10 relative text-black text-center" id={modalID}>
                <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => props.onClose()}></i>
                <h1>{props.awayTeam.teamName} {props.awayTeam.teamMascot} @ {props.homeTeam.teamName} {props.homeTeam.teamMascot}</h1>
                
                <br />
                <br />

                <span>
                    {/*{props.game.date.getMonth().toString()}/{props.game.date.getDay().toString()}/{props.game.date.getFullYear().toString()}<br /> */}
                    {props.game.date.toString()}
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
                    <p>More Details:</p>
                    <a href={espnURL}>ESPN</a>
                    <a href={cbsURL}>CBS</a>
                </span>
            </div>
        </div>
    )
}


export default GameInfoModal;
