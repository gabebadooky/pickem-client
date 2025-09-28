import { League } from "../../types/league";
import { User } from "../../types/user";


export type LeagueNavBarProps = {
    authenticatedUser: User;
    leagueFilter: League;
    setLeagueFilter: React.Dispatch<React.SetStateAction<League>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}