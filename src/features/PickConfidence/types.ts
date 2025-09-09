import { Game } from "../../types/game";
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";
import { User } from "../../types/user";

export type ConfidenceOptionKeys = "l" | "m" | "h";

export type ConfidenceOptionProperties = {
    label: string;
    reward: string;
    penalty: string;
}


export type ComponentProps = {
    allPicks: Pick[];
    currentUser: User;
    game: Game;
    pick: Pick;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    team: Team;
}