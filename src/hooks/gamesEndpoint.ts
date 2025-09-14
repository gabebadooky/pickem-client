import { Game } from "../types/game";
import { pickemEndpointURL } from "../types/baseURLs";


export const callGetAllGamesEndpoint =  async (): Promise<Array<Game>> => {
    const endpointURL: string = `${pickemEndpointURL}/games`;
    const nullGames: Game[] = [];

    try {
        const response = await fetch(endpointURL);

        if (!response.ok) {
            return nullGames;
        } else {
            return response.json();
        }
    } catch {
        return nullGames;
    }
}


export const callGetGamesByWeekEndpoint =  async (week: number): Promise<Array<Game>> => {
    const endpointURL: string = `${pickemEndpointURL}/games/week/${week}`;
    const nullGame: Game[] = [];

    try {
        const response = await fetch(endpointURL);
        
        if (!response.ok) {
            return nullGame;
        } else {
            return response.json();
        }
    } catch {
        return nullGame;
    }
}