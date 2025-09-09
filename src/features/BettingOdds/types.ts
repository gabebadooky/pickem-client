import { Game } from "../../types/game";
import { Team } from "../../types/team";


export type ComponentProps = {
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    selectedTeam: string;
    source: string;
}


export type TableRowProps = {
    label: string;
    parentComponentID: string;
    value: string;
}


export type OddsValues = {
    moneyline: string;
    spread: string;
    percentage: string;
    overUnder: string;
}