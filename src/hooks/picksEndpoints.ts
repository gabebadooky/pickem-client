import { pickemEndpointURL } from "../types/baseURLs";
import { Pick } from "../types/pick";


const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const callGetUserPicksEndpoint = async (userID: number): Promise<Array<Pick>> => {
    const endpointURL: string = `${pickemEndpointURL}/picks/${userID}`;
    const nullPick: Pick = {
        userID: -1,
        gameID: "",
        teamPicked: "",
        pickWeight: ""
    };

    if (userID === -1) {
        return [nullPick];
    } else {
        const response = await fetch(endpointURL);

        try {
            if (!response.ok) {
                return [nullPick];
            } else {
                return response.json();
            }
        } catch {
            return [nullPick];
        }
    }
}


export const callSubmitPickEndpoint = async (token: string, pick: Pick): Promise<boolean> => {
    const endpointURL: string = `${pickemEndpointURL}/picks/submit`;

    if (!pickemHeaders.get("Authorization")) {
        pickemHeaders.append("Authorization", `Bearer ${token}`);
    }
    
    const requestBody: string = JSON.stringify({
        userID: pick.userID,
        gameID: pick.gameID,
        teamPicked: pick.teamPicked,
        pickWeight: pick.pickWeight
    });

    try {
        const response = await fetch(endpointURL, {
            method: "POST",
            headers: pickemHeaders,
            body: requestBody
        });
        
        if (!response.ok) {
            return false;
        } else {
            const responseMessage = await response.json();
            return "error" in responseMessage ? false : true;
        }
    } catch (err) {
        return false;
    }
}