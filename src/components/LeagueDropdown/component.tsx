import { League } from "../../types/league";
import { LeagueOption } from "./LeagueOption";
import { LeagueDropdownProps } from "./types";


const SelectElement = (props: LeagueDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const leagueSelection = e.currentTarget.value as League;
        props.setLeagueFilter(leagueSelection);
    }


    return (
        <select
            className="h-full m-auto w-full"
            id="league-dropdown-input"
            name="league-dropdown"
            onChange={(e) => handleChangeEvent(e)}
        >
            {LeagueOption("ALL", "All Games")}
            {LeagueOption("NFL", "NFL")}
            {LeagueOption("CFB", "CFB (All)")}
            {LeagueOption("CFBT25", "CFB Top 25")}
            {LeagueOption("CFBP4", "CFB Power Conference")}
            {LeagueOption("CFBG6", "CFB Non-Power Conference")}
        </select>
    );
}


export default SelectElement;