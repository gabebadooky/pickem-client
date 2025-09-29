import { LeftArrow } from "../NavArrows/LeftArrow";
import RightArrow from "../NavArrows/RightArrow/component";
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
            <LeftArrow onClick={() => handleDecrementWeekClick(props.setWeekFilter, props.weekFilter)} />
            <WeekDropdown
                weekFilter={props.weekFilter}
                setWeekFilter={props.setWeekFilter}
            />
            <RightArrow onClick={() => handleIncrementWeekClick(props.setWeekFilter, props.weekFilter)} />   
        </div>
    );
}


export default WeekNavBar;