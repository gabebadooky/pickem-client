import { extractEndDateStringFromCurrentWeek, extractStartDateStringFromCurrentWeek } from "./utils";


export const WeekOption = (weekValue: number, weekFilter: number) => {
    return (
        <option
            id={`week-dropdown-input-${weekValue}-option`}
            selected={weekValue === weekFilter}
            value={weekValue}
        >
            {extractStartDateStringFromCurrentWeek(weekValue)} - {extractEndDateStringFromCurrentWeek(weekValue)}
        </option>
    );
}