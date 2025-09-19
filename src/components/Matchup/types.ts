import { Game } from "../../types/game";
import { Team } from "../../types/team";
import { Pick } from "../../types/pick";
import { User } from "../../types/user";


export type MatchupProps = {
    allGames: Game[];
    allPicks: Pick[];
    allTeams: Team[];
    authenticatedUser: User;
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    isModalOpen: boolean;
    pick: Pick;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
}