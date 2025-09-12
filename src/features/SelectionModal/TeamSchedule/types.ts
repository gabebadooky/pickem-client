import { Game } from "../../types/game"
import { Team } from "../../types/team";

export type TeamScheduleProps = {
    allGames: Game[];
    allTeams: Team[]
    team: Team;
}