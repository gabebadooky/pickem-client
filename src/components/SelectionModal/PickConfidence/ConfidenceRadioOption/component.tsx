import { setConfidenceOptionProperties, updatePickInDatabaseAndState } from "./component";
import { ConfidenceRadioOptionProps, ConfidenceOptionProperties } from "./types";
import { gameHasKickedOff } from "../../../../utils/dates";


const ConfidenceRadioOption = (props: ConfidenceRadioOptionProps) => {
    const confidenceOption: ConfidenceOptionProperties = setConfidenceOptionProperties(props.confidenceLevel);
    const componentID: string = `${props.game.gameID}-${confidenceOption.label}-confidence-option`;
    const initiallyChecked: boolean = props.pick.teamPicked === props.team.teamID && props.pick.pickWeight === props.confidenceLevel;
    const isRadioOptionDisabled: boolean = props.authenticatedUser.userID !== props.pick.userID || gameHasKickedOff(props.game.date, props.game.time);

    
    const handleRadioClickEvent = (e: React.MouseEvent<HTMLInputElement>): void => {
        updatePickInDatabaseAndState(props.team.teamID, e.currentTarget.value, props);
        props.setIsModalOpen(false);
    }


    return (
        <div
            className="h-full m-auto my-3 w-full"
            id={`${componentID}-input-component`}
            key={`${componentID}-input-component`}
        >

            <input
                defaultChecked={initiallyChecked}
                disabled={isRadioOptionDisabled}
                id={`${componentID}-radio-input`}
                name="confidence-level"
                onClick={(e) => handleRadioClickEvent(e)}
                type="radio"
                value={props.confidenceLevel}
            />

            <label htmlFor={`${componentID}-radio-input`}> {confidenceOption.label} Confidence</label>

            <p>
                <span className="text-green-600">Reward: {confidenceOption.reward}</span> <span className="text-red-600">Penalty: {confidenceOption.penalty}</span>
            </p>

        </div>
    );
}


export default ConfidenceRadioOption;