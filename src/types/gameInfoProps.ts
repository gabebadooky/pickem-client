import { Game } from "./game";
import { Team } from "./team";

export interface GameInfoProps {
    game: Game;
    awayTeam: Team;
    homeTeam: Team;
}