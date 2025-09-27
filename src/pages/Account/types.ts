import { Team } from "../../types/team"
import { User } from "../../types/user"

export type AccountLoaderProps = {
    allTeams: Team[], 
    authenticatedUser: User;
}