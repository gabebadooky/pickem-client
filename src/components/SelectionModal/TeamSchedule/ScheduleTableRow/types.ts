import { Game } from "../../../../types/game"
import { Team } from "../../../../types/team";

export type ScheduleTableRowProps = {
    allTeams: Team[];
    game: Game;
    team: Team;
}