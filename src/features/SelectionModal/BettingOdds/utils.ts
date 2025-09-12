import { BettingOddsProps, OddsValues } from "./types";


export const instantiateOddsValues = (props: BettingOddsProps) => {
    let values: OddsValues = {
        moneyline: "",
        spread: "",
        percentage: "",
        overUnder: ""
    }

    switch (props.source) {
        case "ESPN":
            values.moneyline = props.awayTeam.teamID === props.selectedTeam ? props.game.espnAwayMoneyline : props.game.espnHomeMoneyline;
            values.spread = props.awayTeam.teamID === props.selectedTeam ? props.game.espnAwaySpread : props.game.espnHomeSpread;
            values.percentage = props.awayTeam.teamID === props.selectedTeam ? props.game.espnAwayWinPercentage : props.game.espnHomeWinPercentage;
            values.overUnder = props.game.espnOverUnder;
            break;
        case "CBS":
            values.moneyline = props.awayTeam.teamID === props.selectedTeam ? props.game.cbsAwayMoneyline : props.game.cbsHomeMoneyline;
            values.spread = props.awayTeam.teamID === props.selectedTeam ? props.game.cbsAwaySpread : props.game.cbsHomeSpread;
            values.percentage = props.awayTeam.teamID === props.selectedTeam ? props.game.cbsAwayWinPercentage : props.game.cbsHomeWinPercentage;
            values.overUnder = props.game.cbsOverUnder;
            break;
        case "FOX":
            values.moneyline = props.awayTeam.teamID === props.selectedTeam ? props.game.foxAwayMoneyline : props.game.foxHomeMoneyline;
            values.spread = props.awayTeam.teamID === props.selectedTeam ? props.game.foxAwaySpread : props.game.foxHomeSpread;
            values.percentage = props.awayTeam.teamID === props.selectedTeam ? props.game.foxAwayWinPercentage : props.game.foxHomeWinPercentage;
            values.overUnder = props.game.foxOverUnder;
            break;
        default:
            values.moneyline = "N/A";
            values.spread = "N/A";
            values.percentage = "N/A";
            values.overUnder = "N/A";
            break;
    }

    return values;
}