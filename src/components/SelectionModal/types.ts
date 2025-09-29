import React from "react";
import { Game } from "../../types/game"
import { Pick } from "../../types/pick";
import { Team } from "../../types/team";
import { User } from "../../types/user";

export type SelectionModalProps = {
    allGames: Game[];
    allPicks: Pick[];
    allTeams: Team[];
    authenticatedUser: User;
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    isModalOpen: boolean;
    pick: Pick;
    selectedTeam: Team;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
}