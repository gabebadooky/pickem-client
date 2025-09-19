import { Game } from "../../types/game";
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";
import { User } from "../../types/user";


export type MatchupsContainerProps = {
    allGames: Game[];
    allPicks: Pick[];
    allTeams: Team[];
    authenticatedUser: User;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    userFilter: number;
}