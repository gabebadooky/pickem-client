import { Game } from "./game";
import { Pick } from "./pick";
import { Team } from "./team";

export interface pickRowProps {
    game: Game;
    teams: Array<Team>;
    picks: Array<Pick>;
}