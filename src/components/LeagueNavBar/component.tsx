import { LeagueDropdown } from "./LeagueDropdown";
import { LeagueNavBarProps } from "./types";


const LeagueNavBar = (props: LeagueNavBarProps) => {
    return (
        <div
            className="flex justify-between h-full m-auto top-0 w-full"
            id="picks-page-league-div"
        >
            <i className="fa-slab fa-regular fa-user"></i>
            <LeagueDropdown setLeagueFilter={props.setLeagueFilter} />
            <span></span>
        </div>
    );
}


export default LeagueNavBar;