import { seasonWeeks, weekdays } from "../../../utils/dates";
import { WeekOption } from "./WeekOption";


export const renderAllWeekOptions = (numberOfWeeks: number) => {
    for (let i = 0; i < numberOfWeeks; i++) {
        return WeekOption(i);
    }
}


export const extractStartDateStringFromCurrentWeek = (week: number): string => {
    const currentWeekStartDate: Date = seasonWeeks[week].start;
    const weekdayAbbr: string = weekdays[currentWeekStartDate.getDay() + 1]
    const month: number = currentWeekStartDate.getMonth() + 1;
    const date: number = currentWeekStartDate.getDate() + 1;

    const formattedStartDateString: string = `${weekdayAbbr} ${month}/${date}`;
    
    return formattedStartDateString;
}


export const extractEndDateStringFromCurrentWeek = (week: number): string => {
    const currentWeekEndDate: Date = seasonWeeks[week].end;
    const weekdayAbbr: string = weekdays[currentWeekEndDate.getDay() + 1]
    const month: number = currentWeekEndDate.getMonth() + 1;
    const date: number = currentWeekEndDate.getDate() + 1;

    const formattedEndDateString: string = `${weekdayAbbr} ${month}/${date}`;

    return formattedEndDateString;
}