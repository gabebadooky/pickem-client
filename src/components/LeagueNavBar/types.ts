import { League } from "../../types/league";
import { User } from "../../types/user";


export type LeagueNavBarProps = {
    authenticatedUser: User;
    setLeagueFilter: React.Dispatch<React.SetStateAction<League>>;
}