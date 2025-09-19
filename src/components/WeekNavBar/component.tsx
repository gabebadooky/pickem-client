import { handleDecrementWeekClick } from "./component";
import { handleIncrementWeekClick } from "./component";
import { WeekNavBarProps } from "./types";
import { WeekDropdown } from "./WeekDropdown";


const WeekNavBar = (props: WeekNavBarProps) => {
    return (
        <div
            className="h-[10%] flex justify-between m-auto top-0 w-full"
            id="picks-page-week-nav-bar"
        >

            <i 
                className="fa-slab fa-regular fa-arrow-left"
                onClick={() => handleDecrementWeekClick(props.setWeekFilter, props.weekFilter)}
            >
            </i>

            <WeekDropdown
                weekFilter={props.weekFilter}
                setWeekFilter={props.setWeekFilter}
            />
            
            <i
                className="fa-slab fa-regular fa-arrow-right"
                onClick={() => handleIncrementWeekClick(props.setWeekFilter, props.weekFilter)}
            >
            </i>
            
        </div>
    );
}


export default WeekNavBar;