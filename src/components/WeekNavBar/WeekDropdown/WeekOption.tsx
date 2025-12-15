import { extractEndDateStringFromCurrentWeek, extractStartDateStringFromCurrentWeek } from "./component";

export const WeekOption = (weekValue: number) => {
    return (
        <option
            id={`week-dropdown-input-${weekValue}-option`}
            key={`week-dropdown-input-${weekValue}-option`}
            value={weekValue}
        >
            {extractStartDateStringFromCurrentWeek(weekValue)} - {extractEndDateStringFromCurrentWeek(weekValue)}
        </option>
    );
}