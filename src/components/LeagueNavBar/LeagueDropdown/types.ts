import { League } from "../../../types/league";


export type LeagueDropdownProps = {
    defaultValue: League;
    setLeagueFilter: React.Dispatch<React.SetStateAction<League>>;
}