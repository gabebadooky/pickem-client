import React from "react";
import { Team } from "../../../types/team";
import { TeamNotes } from "../../../types/teamNotes";
import { User } from "../../../types/user";


export type TeamNotesProps = {
    allTeamNotes: TeamNotes[];
    authenticatedUser: User;
    setTeamNotes: React.Dispatch<React.SetStateAction<TeamNotes[]>>;
    team: Team;
    teamNotes: TeamNotes;
}