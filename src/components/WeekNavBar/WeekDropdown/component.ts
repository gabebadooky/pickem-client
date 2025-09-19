import { seasonWeeks } from "../../../utils/dates";
import { WeekOption } from "./WeekOption";


export const renderAllWeekOptions = (numberOfWeeks: number) => {
    for (let i = 0; i < numberOfWeeks; i++) {
        return WeekOption(i);
    }
}


export const extractStartDateStringFromCurrentWeek = (week: number): string => {
    const currentWeekStartDate: Date = seasonWeeks[week].start;
    const formattedStartDateString: string = `${currentWeekStartDate.getUTCDay()} ${currentWeekStartDate.getUTCMonth()}/${currentWeekStartDate.getUTCDate()}`;
    
    return formattedStartDateString;
}


export const extractEndDateStringFromCurrentWeek = (week: number): string => {
    const currentWeekEndDate: Date = seasonWeeks[week].end;
    const formattedEndDateString: string = `${currentWeekEndDate.getUTCDay()} ${currentWeekEndDate.getUTCMonth()}/${currentWeekEndDate.getUTCDate()}`;

    return formattedEndDateString;
}