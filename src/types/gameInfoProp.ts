import { Game } from "./game";
import { Team } from "./team";

export interface GameInfoProp {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
    onClose: Function;
}