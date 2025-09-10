import { setConfidenceOptionProperties, gameHasKickedOff, updatePickInDatabaseAndState } from "./utils";
import { ConfidenceRadioOptionProps, ConfidenceOptionProperties } from "./types";


const ConfidenceRadioOption = (props: ConfidenceRadioOptionProps) => {
    const confidenceOption: ConfidenceOptionProperties = setConfidenceOptionProperties(props.confidenceLevel);
    const componentID: string = `${props.game.gameID}-${confidenceOption.label}-confidence-option`;
    const isRadioOptionDisabled: boolean = props.currentUser.userID !== props.pick.userID || gameHasKickedOff(props.game.date, props.game.time);
    const initiallyChecked: boolean = props.pick.teamPicked === props.team.teamID && props.pick.pickWeight === props.confidenceLevel;

    return (
        <div
            className="h-full w-full"
            id={`${componentID}-input-component`}
            key={`${componentID}-input-component`}
        >

            <input
                defaultChecked={initiallyChecked}
                disabled={isRadioOptionDisabled}
                id={`${componentID}-radio-input`}
                name="confidence-level"
                onClick={(e) => updatePickInDatabaseAndState(props.team.teamID, e.currentTarget.value, props)}
                type="radio"
                value={props.confidenceLevel}
            />

            <label
                htmlFor={`${componentID}-radio-input`}
            >
                {confidenceOption.label} Confidence
            </label>

            <p className="text-green-600">
                <span>Reward: {confidenceOption.reward}</span>
            </p>

            <p className="text-red-600">
                <span>Penalty: {confidenceOption.penalty}</span>
            </p>

        </div>
    );
}


export default ConfidenceRadioOption;