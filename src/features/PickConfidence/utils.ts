import { callSubmitPickEndpoint } from "../../hooks/picksEndpoint";
import { ComponentProps, ConfidenceOptionProperties } from "./types";
import { zuluTimeToLocaleFormattedDate } from "../../utils/dates";


export const confidenceOptions: {[key: string]: ConfidenceOptionProperties} = {
    "l": {
        label: "Low",
        reward: "+1",
        penalty: "0"
    },
    "m": {
        label: "Medium",
        reward: "+3",
        penalty: "-2"
    },
    "h": {
        label: "High",
        reward: "+7",
        penalty: "-7"
    }
}


export const gameHasKickedOff = (gameDate: Date, gameTime: string): boolean => {
    const now: Date = new Date();
    return now > zuluTimeToLocaleFormattedDate(gameDate, gameTime);
}


export const updatePickInDatabaseAndState = (selectedTeam: string, pickConfidence: string, props: ComponentProps) => {
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