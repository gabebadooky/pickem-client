import BettingOddTableRow from "./BettingOddTableRow";

import { Game } from "../../types/game";
import { Team } from "../../types/team";

type Props = {
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    selectedTeam: string;
    source: string;
}

const BettingOddsInfo = (props: Props) => {
    const componentID: string = `${props.game.gameID}-${props.source}`;
    const teamName: string = props.awayTeam.teamID === props.selectedTeam ? props.awayTeam.teamName: props.homeTeam.teamName;
    const h1Content: string = `${props.source.toUpperCase()} ${teamName} Betting Odds`;
    let moneyline: string = "";
    let spread: string = "";
    let percentage: string = "";
    let overUnder: string = "";
   
    switch (props.source) {
        case "ESPN":
            moneyline = props.awayTeam.teamID === props.selectedTeam ? props.game.espnAwayMoneyline : props.game.espnHomeMoneyline;
            spread = props.awayTeam.teamID === props.selectedTeam ? props.game.espnAwaySpread : props.game.espnHomeSpread;
            percentage = props.awayTeam.teamID === props.selectedTeam ? props.game.espnAwayWinPercentage : props.game.espnHomeWinPercentage;
            overUnder = props.game.espnOverUnder;
            break;
        case "CBS":
            moneyline = props.awayTeam.teamID === props.selectedTeam ? props.game.cbsAwayMoneyline : props.game.cbsHomeMoneyline;
            spread = props.awayTeam.teamID === props.selectedTeam ? props.game.cbsAwaySpread : props.game.cbsHomeSpread;
            percentage = props.awayTeam.teamID === props.selectedTeam ? props.game.cbsAwayWinPercentage : props.game.cbsHomeWinPercentage;
            overUnder = props.game.cbsOverUnder;
            break;
        case "FOX":
            moneyline = props.awayTeam.teamID === props.selectedTeam ? props.game.foxAwayMoneyline : props.game.foxHomeMoneyline;
            spread = props.awayTeam.teamID === props.selectedTeam ? props.game.foxAwaySpread : props.game.foxHomeSpread;
            percentage = props.awayTeam.teamID === props.selectedTeam ? props.game.foxAwayWinPercentage : props.game.foxHomeWinPercentage;
            overUnder = props.game.foxOverUnder;
            break;
        default:
            moneyline = "N/A";
            spread = "N/A";
            percentage = "N/A";
            overUnder = "N/A";
            break;
    }

    return (
        <div
            className="h-full w-full"
            id={`${componentID}-betting-odds-component`}
            key={`${componentID}-betting-odds-component`}
        >
            <h1 className="my-5" id={`${componentID}-betting-odds-h1`}>{h1Content}</h1>

            <table id={`${componentID}-betting-odds-table`} key={`${componentID}-betting-odds-table`}>
                
                <BettingOddTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Moneyline`}
                    value={moneyline}
                />

                <BettingOddTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Spread`}
                    value={spread}
                />

                <BettingOddTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Percentage`}
                    value={percentage}
                />

                <BettingOddTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Over/Under`}
                    value={overUnder}
                />

            </table>
        </div>
    );
}


export default BettingOddsInfo;