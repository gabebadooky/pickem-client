import { League } from "../../../types/league";

export type LeagueDropdownProps = {
    setLeagueFilter: React.Dispatch<React.SetStateAction<League>>;
}