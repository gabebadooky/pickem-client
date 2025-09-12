import { Game } from "../../types/game"
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";

export type SelectionModalProps = {
    allGames: Game[];
    allTeams: Team[];
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    pick: Pick;
    selectedTeam: Team;
}