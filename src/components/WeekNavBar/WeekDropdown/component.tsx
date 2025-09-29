import { WeekDropdownProps } from "./types";
import { seasonWeeks } from "../../../utils/dates";
import React from "react";
import { WeekOption } from "./WeekOption";


const WeekDropdown = (props: WeekDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setWeekFilter(Number(e.currentTarget.value));
    }


    return (
        <select
            className="appearance-none h-full m-auto px-5 text-center w-full"
            id="week-dropdown-input"
            name="week-dropdown"
            onChange={(e) => handleChangeEvent(e)}
            value={props.weekFilter}
        >
            {Array.from({ length: seasonWeeks.length }, (_, i) => i).map((week) => WeekOption(week))}
        </select>
    );
}


export default WeekDropdown;