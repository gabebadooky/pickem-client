import { Game } from "../../types/game";
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";
import { User } from "../../types/user";


export type PickConfidenceProps = {
    allPicks: Pick[];
    awayTeam: Team;
    currentUser: User;
    game: Game;
    homeTeam: Team;
    pick: Pick;
    selectedTeam: Team;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
}