import { seasonWeeks, weekdays } from "../../../utils/dates";
import { WeekOption } from "./WeekOption";


export const renderAllWeekOptions = (numberOfWeeks: number) => {
    for (let i = 0; i < numberOfWeeks; i++) {
        return WeekOption(i);
    }
}


export const extractStartDateStringFromCurrentWeek = (week: number): string => {
    const currentWeekStartDate: Date = seasonWeeks[week].start;
    const weekdayAbbr: string = weekdays[currentWeekStartDate.getUTCDay()]
    const month: number = currentWeekStartDate.getUTCMonth() + 1;
    const date: number = currentWeekStartDate.getUTCDate() + 1;

    const formattedStartDateString: string = `${weekdayAbbr} ${month}/${date}`;
    
    return formattedStartDateString;
}


export const extractEndDateStringFromCurrentWeek = (week: number): string => {
    const currentWeekEndDate: Date = seasonWeeks[week].end;
    const weekdayAbbr: string = weekdays[currentWeekEndDate.getUTCDay()]
    const month: number = currentWeekEndDate.getUTCMonth() + 1;
    const date: number = currentWeekEndDate.getUTCDate() + 1;

    const formattedEndDateString: string = `${weekdayAbbr} ${month}/${date}`;

    return formattedEndDateString;
}