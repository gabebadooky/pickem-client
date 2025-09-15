import { Game } from "../../types/game";
import { Team } from "../../types/team";
import { Pick } from "../../types/pick";
import { TeamNotes } from "../../types/teamNotes";
import { User } from "../../types/user";


export type TeamTileProps = {
    allGames: Game[];
    allPicks: Pick[];
    allTeams: Team[];
    allTeamsNotes: TeamNotes[];
    authenticatedUser: User;
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    isModalOpen: boolean;
    pick: Pick;
    tileTeam: Team;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    setTeamNotes: React.Dispatch<React.SetStateAction<TeamNotes[]>>;
}