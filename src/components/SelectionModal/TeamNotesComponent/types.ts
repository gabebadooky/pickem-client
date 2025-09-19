import { Team } from "../../../types/team";
import { User } from "../../../types/user";


export type TeamNotesProps = {
    authenticatedUser: User;
    team: Team;
}