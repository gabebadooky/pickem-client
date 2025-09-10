import { BettingOddsTableRow } from "./BettingOddsTableRow";
import { BettingOddsProps, OddsValues } from "./types";
import { instantiateOddsValues } from "./utils";


const BettingOdds = (props: BettingOddsProps) => {
    const componentID: string = `${props.game.gameID}-${props.source}`;
    const teamName: string = props.awayTeam.teamID === props.selectedTeam ? props.awayTeam.teamName: props.homeTeam.teamName;
    const h1Content: string = `${teamName} ${props.source.toUpperCase()} Betting Odds`;
    const oddsValues: OddsValues = instantiateOddsValues(props);

    return (
        <div
            className="h-full text-center w-full"
            id={`${componentID}-betting-odds-component`}
            key={`${componentID}-betting-odds-component`}
        >
            <h1 className="my-5" id={`${componentID}-betting-odds-h1`}>{h1Content}</h1>

            <table
                className="w-full"
                id={`${componentID}-betting-odds-table`}
                key={`${componentID}-betting-odds-table`}
            >
                
                <BettingOddsTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Moneyline`}
                    value={oddsValues.moneyline}
                />

                <BettingOddsTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Spread`}
                    value={oddsValues.spread}
                />

                <BettingOddsTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Percentage`}
                    value={oddsValues.percentage}
                />

                <BettingOddsTableRow
                    parentComponentID={componentID}
                    label={`${teamName} Over/Under`}
                    value={oddsValues.overUnder}
                />

            </table>
        </div>
    );
}


export default BettingOdds;