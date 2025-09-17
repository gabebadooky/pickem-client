import { useState } from "react";
import { WeekDropdown } from "../components/WeekDropdown";
import { League } from "../types/league";
import { calculateCurrentWeek } from "../utils/dates";
import { UsersDropdown } from "../components/UsersDropdown";
import { LeagueDropdown } from "../components/LeagueDropdown";


const Picks = () => {
    const [leagueFilter, setLeagueFilter] = useState<League>("ALL");
    const [weekFilter, setWeekFilter] = useState<number>(calculateCurrentWeek());
    const [userFilter, setUserFilter] = useState<number>(-1);

    const handleDecrementWeekClick = (): void => {
        setWeekFilter(weekFilter - 1);
    }

    const handleIncrementWeekClick = (): void => {
        setWeekFilter(weekFilter + 1);
    }

    const handleDecrementUserIndexClick = (): void => {
        setUserFilter(userFilter - 1);
    }

    const handleIncrementUserIndexClick = (): void => {
        setUserFilter(userFilter + 1);
    }


    return (
        <div
            className="h-full m-auto w-full"
        >

            <div
                className="h-[10%] flex justify-between m-auto top-0 w-full"
                id="picks-page-week-nav-bar"
            >
                <i className="fa-slab fa-regular fa-arrow-left" onClick={handleDecrementWeekClick}></i>
                <WeekDropdown weekFilter={weekFilter} setWeekFilter={setWeekFilter} />
                <i className="fa-slab fa-regular fa-arrow-right" onClick={handleIncrementWeekClick}></i>
            </div>

            <div
                className="h-[10%] flex justify-between m-auto top-0 w-full"
                id="picks-page-user-nav-bar"
            >
                <i className="fa-slab fa-regular fa-arrow-left" onClick={handleDecrementUserIndexClick}></i>
                {/* <UsersDropdown allUsers={props.allUsers} userFilter={userFilter} setUserFilter={setUserFilter} /> */}
                <i className="fa-slab fa-regular fa-arrow-right" onClick={handleIncrementUserIndexClick}></i>
            </div>

            <div
                className="m-auto w-full"
                id="picks-page-league-div"
            >
                <LeagueDropdown setLeagueFilter={setLeagueFilter} />
            </div>

        </div>
    );
}