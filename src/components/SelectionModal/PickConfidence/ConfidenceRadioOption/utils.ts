import { callSubmitPickEndpoint } from "../../../../hooks/picksEndpoints";
import { ConfidenceRadioOptionProps, ConfidenceOptionKeys, ConfidenceOptionProperties } from "./types";


export const setConfidenceOptionProperties = (confidenceLevel: ConfidenceOptionKeys): ConfidenceOptionProperties => {
    let optionProperties: ConfidenceOptionProperties = {
        label: "N/A",
        reward: "0",
        penalty: "0"
    }

    switch (confidenceLevel) {
        case "l":
            optionProperties.label = "Low";
            optionProperties.reward = "+1";
            optionProperties.penalty = "0";
            break;
        case "m":
            optionProperties.label = "Medium";
            optionProperties.reward = "+3";
            optionProperties.penalty = "-2";
            break;

        case "h":
            optionProperties.label = "High";
            optionProperties.reward = "+7";
            optionProperties.penalty = "-7";
            break;
            
        default:
            break; 
    }

    return optionProperties;
}


export const updatePickInDatabaseAndState = (selectedTeam: string, pickConfidence: string, props: ConfidenceRadioOptionProps) => {
    callSubmitPickEndpoint(localStorage.getItem("jwt") || "", {
        userID: props.pick.userID,
        gameID: props.pick.gameID,
        teamPicked: selectedTeam,
        pickWeight: pickConfidence
    })
    .then((response: boolean) => {
        if (response) {
            props.setPicks(props.allPicks.map(pick =>
                pick.userID === props.pick.userID
                    &&
                pick.gameID === props.pick.gameID
                    ?
                {   ...pick,
                    teamPicked: selectedTeam,
                    pickWeight: pickConfidence
                } : pick
            ))
        } else {
            alert("Error occurred submitting pick! Please try again and let the developer know he sucks. 🙃");
        }
    })
    .catch(() => alert("Error occurred submitting pick! Please try again and let the developer know he sucks. 🙃"));
}