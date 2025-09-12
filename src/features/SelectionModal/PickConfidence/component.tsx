import { ConfidenceRadioOption } from "./ConfidenceRadioOption";
import { GameTimeOrScore, TvCoverage } from "./GameDetails";
import { PickConfidenceHeader } from "./PickConfidenceHeader";
import { PickConfidenceProps } from "./types";


const PickConfidence = (props: PickConfidenceProps) => {
    const componentID: string = `${props.game.gameID}-confidence-pick-component`;
    
    return (
        <div
            className="h-full m-auto w-full"
            id={componentID}
        >
            <div id={`${componentID}-header`}>
                <PickConfidenceHeader
                    awayTeam={props.awayTeam}
                    homeTeam={props.homeTeam}
                    selectedTeam={props.selectedTeam}
                />
            </div>

            <div id={`${componentID}-game-details`}>
                <GameTimeOrScore game={props.game} />
                <TvCoverage game={props.game} />
            </div>

            <div className="mr-5" id={`${componentID}-radio-options-div`}>
                
                <div className="my-1" id={`${componentID}-low-confidence-option-div`} key={`${componentID}-low-confidence-option-div`}>
                    <ConfidenceRadioOption
                        allPicks={props.allPicks}
                        confidenceLevel="l"
                        currentUser={props.currentUser}
                        game={props.game}
                        pick={props.pick}
                        setPicks={props.setPicks}
                        team={props.selectedTeam}
                    />
                </div>

                <div className="my-1" id={`${componentID}-med-confidence-option-div`} key={`${componentID}-medium-confidence-option-div`}>
                    <ConfidenceRadioOption
                        allPicks={props.allPicks}
                        confidenceLevel="m"
                        currentUser={props.currentUser}
                        game={props.game}
                        pick={props.pick}
                        setPicks={props.setPicks}
                        team={props.selectedTeam}
                    />
                </div>

                <div className="my-1" id={`${componentID}-high-confidence-option-div`} key={`${componentID}-high-confidence-option-div`}>
                    <ConfidenceRadioOption
                        allPicks={props.allPicks}
                        confidenceLevel="h"
                        currentUser={props.currentUser}
                        game={props.game}
                        pick={props.pick}
                        setPicks={props.setPicks}
                        team={props.selectedTeam}
                    />
                </div>

            </div>
        </div>
    );
}


export default PickConfidence;