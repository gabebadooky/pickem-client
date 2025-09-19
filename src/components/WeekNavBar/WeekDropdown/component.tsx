import { WeekDropdownProps } from "./types";
import { renderAllWeekOptions } from "./component";
import { seasonWeeks } from "../../../utils/dates";
import React from "react";
import { WeekOption } from "./WeekOption";


const WeekDropdown = (props: WeekDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setWeekFilter(Number(e.currentTarget.value));
    }


    return (
        <select
            className="h-full m-auto text-center w-full"
            defaultValue={props.weekFilter}
            id="week-dropdown-input"
            name="week-dropdown"
            onChange={(e) => handleChangeEvent(e)}
        >
            {Array.from({ length: seasonWeeks.length }, (_, i) => i).map((week) => WeekOption(week))}
            {/* renderAllWeekOptions(seasonWeeks.length) */}
        </select>
    );
}


export default WeekDropdown;