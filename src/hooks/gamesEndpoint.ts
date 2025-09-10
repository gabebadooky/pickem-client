import { Game } from "../types/game";
import { pickemEndpointURL } from "../types/baseURLs";


export const CallGetAllGamesEndpoint =  async (): Promise<Array<Game>> => {
    const endpointURL: string = `${pickemEndpointURL}/games`;
    const response = await fetch(endpointURL);
    const nullGames: Game[] = [];

    try {
        if (!response.ok) {
            return nullGames;
        } else {
            return response.json();
        }
    } catch {
        return nullGames;
    }
}


export const CallGetGamesByWeekEndpoint =  async (week: number): Promise<Array<Game>> => {
    const endpointURL: string = `${pickemEndpointURL}/games/week/${week}`
    const response = await fetch(endpointURL);
    const nullGame: Game[] = [];

    try {
        if (!response.ok) {
            return nullGame;
        } else {
            return response.json();
        }
    } catch {
        return nullGame;
    }
}