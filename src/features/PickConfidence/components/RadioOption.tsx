import { confidenceOptions, gameHasKickedOff, updatePickInDatabaseAndState } from "../pickConfidence";
import { ComponentProps, ConfidenceOptionKeys, ConfidenceOptionProperties } from "../types";


const RadioOption = (confidenceLevel: ConfidenceOptionKeys, props: ComponentProps) => {
    const confidenceOption: ConfidenceOptionProperties = confidenceOptions[confidenceLevel];
    const componentID: string = `${confidenceOption}-confidence`;
    const isRadioOptionDisabled: boolean = props.currentUser.userID !== props.pick.userID || gameHasKickedOff(props.game.date, props.game.time);
    const initiallyChecked: boolean = props.pick.teamPicked === props.team.teamID && props.pick.pickWeight === confidenceLevel;

    return (
        <div
            className="my-5"
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
                value={confidenceLevel}
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


export default RadioOption;