import { BettingOddsTableRow } from "./BettingOddsTableRow";
import { BettingOddsProps, OddsValues } from "./types";
import { instantiateGameCode, instantiateOddsValues } from "./component";
import { BettingOddsHyperlink } from "./BettingOddsHyperlink";


const BettingOdds = (props: BettingOddsProps) => {
    const componentID: string = `${props.game.gameID}-${props.source}-betting-odds`;
    const teamName: string = props.awayTeam.teamID === props.selectedTeamID ? props.awayTeam.teamName: props.homeTeam.teamName;
    const h1Content: string = `${teamName} ${props.source.toUpperCase()} Betting Odds`;
    const gameCode: string = instantiateGameCode(props.game, props.source);
    const oddsValues: OddsValues = instantiateOddsValues(props);
    

    return (
        <div
            className="h-full m-auto w-full"
            id={`${componentID}-component`}
            key={`${componentID}-component`}
        >
            <h1 id={`${componentID}-h1`}>{h1Content}</h1>

            <div className="mb-5" id={`${componentID}-hyperlink-div`}>
                <BettingOddsHyperlink componentID={componentID} gameCode={gameCode} league={props.game.league} source={props.source} />
            </div>


            <table
                className="my-5 w-full"
                id={`${componentID}-table`}
                key={`${componentID}-table`}
            >
                <tbody>
                    
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
                        label={`Over/Under`}
                        value={oddsValues.overUnder}
                    />

                </tbody>
            </table>
        </div>
    );
}


export default BettingOdds;