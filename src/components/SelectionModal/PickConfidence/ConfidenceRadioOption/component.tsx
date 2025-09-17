import { gameHasKickedOff } from "../../../../utils/dates";
import { setConfidenceOptionProperties, updatePickInDatabaseAndState } from "./utils";
import { ConfidenceRadioOptionProps, ConfidenceOptionProperties } from "./types";


const ConfidenceRadioOption = (props: ConfidenceRadioOptionProps) => {
    const confidenceOption: ConfidenceOptionProperties = setConfidenceOptionProperties(props.confidenceLevel);
    const componentID: string = `${props.game.gameID}-${confidenceOption.label}-confidence-option`;
    const isRadioOptionDisabled: boolean = props.authenticatedUser.userID !== props.pick.userID || gameHasKickedOff(props.game.date, props.game.time);
    const initiallyChecked: boolean = props.pick.teamPicked === props.team.teamID && props.pick.pickWeight === props.confidenceLevel;

    const handleRadioClickEvent = (e: React.MouseEvent<HTMLInputElement>): void => {
        updatePickInDatabaseAndState(props.team.teamID, e.currentTarget.value, props);
        props.setIsModalOpen(false);
    }


    return (
        <div
            className="h-full m-auto w-full"
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