import { Game } from "../../types/game"
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";
import { TeamNotes } from "../../types/teamNotes";
import { User } from "../../types/user";

export type SelectionModalProps = {
    allGames: Game[];
    allPicks: Pick[];
    allTeams: Team[];
    allTeamsNotes: TeamNotes[];
    authenticatedUser: User;
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    pick: Pick;
    selectedTeam: Team;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    setTeamNotes: React.Dispatch<React.SetStateAction<TeamNotes[]>>;
}