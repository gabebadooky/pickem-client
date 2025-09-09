import { Game } from "../../types/game";
import { Team } from "../../types/team";


export type BettingOddsProps = {
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    selectedTeam: string;
    source: string;
}


export type OddsValues = {
    moneyline: string;
    spread: string;
    percentage: string;
    overUnder: string;
}