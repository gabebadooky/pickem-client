import { Game } from "../../../types/game";
import { Pick } from "../../../types/pick";
import { Team } from "../../../types/team";
import { User } from "../../../types/user";


export type PickConfidenceProps = {
    allPicks: Pick[];
    authenticatedUser: User;
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    pick: Pick;
    selectedTeam: Team;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
}