import { Game } from "../../types/game";
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";
import { TeamNotes } from "../../types/teamNotes";
import { User } from "../../types/user";


export type MatchupsContainerProps = {
    allGames: Game[];
    allPicks: Pick[];
    allTeams: Team[];
    allTeamsNotes: TeamNotes[];
    authenticatedUser: User;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    setTeamNotes: React.Dispatch<React.SetStateAction<TeamNotes[]>>;
    userFilter: number;
}