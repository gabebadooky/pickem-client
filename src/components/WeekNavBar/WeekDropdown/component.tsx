import { WeekDropdownProps } from "./types";
import { renderAllWeekOptions } from "./component";
import { seasonWeeks } from "../../../utils/dates";
import React from "react";


const WeekDropdown = (props: WeekDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setWeekFilter(Number(e.currentTarget.value));
    }


    return (
        <select
            className="h-full m-auto w-full"
            defaultValue={props.weekFilter}
            id="week-dropdown-input"
            name="week-dropdown"
            onChange={(e) => handleChangeEvent(e)}
        >
            {renderAllWeekOptions(seasonWeeks.length)}
        </select>
    );
}


export default WeekDropdown;