import { Pick } from "../components/pick";

const BASE_URL = "http://127.0.0.1:5000";


export const getGames = async () => {
    const response = await fetch(`${BASE_URL}/games/`);
    const data = await response.json();
    if (!response.ok) {
        console.log(`Error occurred during getGames request! ${response.text}`);
    } else {        
        console.log("Games:")
        console.log(data);
    }
};

export const getTeams = async () => {
    const response = await fetch(`${BASE_URL}/teams/`);
    const data = await response.json();
    if (!response.ok) {
        console.log(`Error occurred during getTeams request! ${response.text}`);
    } else {
        console.log("Teams:");
        console.log(data);
    }
    return data;
};

export const getUserPicks = async (username: string) => {
    const response = await fetch(`${BASE_URL}/picks/${username}`);
    const data = await response.json();
    if (!response.ok) {
        console.log(`Error occurred during getUserPicks request! ${response.text}`);
    } else {
        console.log("Picks:");
        console.log(data);
    }    
    return data;
};

export const submitPick = async (pick: Pick) => {
    const response = await fetch(`${BASE_URL}/picks/submit}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "username": pick.username,
            "gameID": pick.gameID,
            "teamPicked": pick.teamPicked,
            "pickWeight": pick.pickWeight
        })
    });
    const data = await response.json();
    if (!response.ok) {
        console.log(`Error occurred during getUserPicks request! ${response.text}`);
    } else {
        console.log("Picks:");
        console.log(data);
    }    
    return data;
};

