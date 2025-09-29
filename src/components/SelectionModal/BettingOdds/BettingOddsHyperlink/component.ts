import { BaseHyperlinks } from "./types"


const baseHyperlinks: BaseHyperlinks = {
    espnCfbGameURL:  "https://www.espn.com/college-football/game/_/gameId",
    cbsCfbGameURL:  "https://www.cbssports.com/college-football/scoreboard",
    foxCfbURL:  "https://www.foxsports.com/college-football",
    espnNflGameURL:  "https://www.espn.com/nfl/game/_/gameId",
    cbsNflGameURL:  "https://www.cbssports.com/nfl/gametracker/live",
    foxNflURL:  "https://www.foxsports.com/nfl"
}

export const instantiateGameHyperlink = (code: string, league: string, source: string) => {
    if (league === "CFB") {
        
        if (source === "ESPN") {
            return `${baseHyperlinks.espnCfbGameURL}/${code}`;

        } else if (source === "CBS") {
            return `${baseHyperlinks.cbsCfbGameURL}`;

        } else if (source === "FOX") {
            return `${baseHyperlinks.foxCfbURL}/${code}`;

        }

    } else {

        if (source === "ESPN") {
            return `${baseHyperlinks.espnNflGameURL}/${code}`;

        } else if (source === "CBS") {
            return `${baseHyperlinks.cbsNflGameURL}`;

        } else if (source === "FOX") {
            return `${baseHyperlinks.foxNflURL}/${code}`;

        }

    }
}