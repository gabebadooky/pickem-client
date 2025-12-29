export const monthAbbreviations: Record<string, string> = {
    "Jan": "1", "Feb": "2", "Mar": "3", 
    "Apr": "4", "May": "5", "Jun": "6", 
    "Jul": "7", "Aug": "8", "Sep": "9", 
    "Oct": "10", "Nov": "11", "Dec": "12"
};

export const weekdays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const seasonWeeks = [
    { start: new Date("2025-08-19"), end: new Date("2025-08-25") },
    { start: new Date("2025-08-26"), end: new Date("2025-09-01") },
    { start: new Date("2025-09-02"), end: new Date("2025-09-08") },
    { start: new Date("2025-09-09"), end: new Date("2025-09-15") },
    { start: new Date("2025-09-16"), end: new Date("2025-09-22") },
    { start: new Date("2025-09-23"), end: new Date("2025-09-29") },
    { start: new Date("2025-09-30"), end: new Date("2025-10-06") },
    { start: new Date("2025-10-07"), end: new Date("2025-10-13") },
    { start: new Date("2025-10-14"), end: new Date("2025-10-20") },
    { start: new Date("2025-10-21"), end: new Date("2025-10-27") },
    { start: new Date("2025-10-28"), end: new Date("2025-11-03") },
    { start: new Date("2025-11-04"), end: new Date("2025-11-10") },
    { start: new Date("2025-11-11"), end: new Date("2025-11-17") },
    { start: new Date("2025-11-18"), end: new Date("2025-11-24") },
    { start: new Date("2025-11-25"), end: new Date("2025-12-01") },
    { start: new Date("2025-12-02"), end: new Date("2025-12-08") },
    { start: new Date("2025-12-09"), end: new Date("2025-12-15") },
    { start: new Date("2025-12-16"), end: new Date("2025-12-22") },
    { start: new Date("2025-12-23"), end: new Date("2025-12-29") },
    { start: new Date("2025-12-30"), end: new Date("2026-01-05") },
    { start: new Date("2026-01-06"), end: new Date("2026-01-12") },
    { start: new Date("2026-01-13"), end: new Date("2026-01-19") },
    { start: new Date("2026-01-20"), end: new Date("2026-01-26") },
    { start: new Date("2026-01-27"), end: new Date("2026-02-02") },
    { start: new Date("2026-02-03"), end: new Date("2026-02-09") }
];


export const calculateCurrentWeek = () => {
    const now: Date = new Date();
    
    if (now < seasonWeeks[0].start) {
        // return week 0 if now < seasonWeeks[0].start
        return 0;

    } else {
        for (let i = 0; i < seasonWeeks.length; i++) {
            if (now <= seasonWeeks[i].end) {
                return i;
            }
        }

        // return last week of season if now > seasonWeeks[seasonWeeks.length].end
        return seasonWeeks.length - 1;
    }

}


export const convertGameDateToLocalTimeString = (gameDate: Date, gameTime: string) => {
    const gameYear = new Date(gameDate).getFullYear();
    const gameMonth = new Date(gameDate).getMonth() + 1;
    const gameDay = new Date(gameDate).getDate() + 1;
    const [zuluHours, zuluMinutes] = gameTime.split(":");
    const utcDate = new Date(gameYear, gameMonth, gameDay, Number(zuluHours), Number(zuluMinutes), 0);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    return localDate.toLocaleDateString().split(", ")[1];
}


export const convertGameDateToMonthDayYearFormat = (gameDate: Date) => {
    const gameYear: number = gameDate.getFullYear();
    const gameMonth: number = gameDate.getMonth() + 1;
    const gameDay: number = gameDate.getDate();

    return `${gameMonth}/${gameDay}/${gameYear}`;
}


export const convertGameDateToLongWeekdayLongMonthNameNumericDateFormat = (gameDate: Date, gameTime: string): string => {
    const gameZuluDatetime = instantiateZuluDateTime(gameDate, gameTime);
    const gameWeekday: string = gameZuluDatetime.toLocaleDateString("en", {weekday: "long"});
    const gameMonth: string = gameZuluDatetime.toLocaleDateString("en", {month: "long"});
    const gameDay: number = gameZuluDatetime.getDate();

    return `${gameWeekday} ${gameMonth}, ${gameDay}`;
}


export const gameHasKickedOff = (gameDate: Date, gameTime: string): boolean => {
    return instantiateZuluDateTime(gameDate, gameTime) < new Date();
}


export const instantiateZuluDateTime = (gameDate: Date, gameTime: string): Date => {
    const gameYear: number = new Date(gameDate).getFullYear();
    const gameMonth: number = new Date(gameDate).getMonth();
    const gameDay: number = new Date(gameDate).getDate() + 1;
    
    const timeStringElements: string[] = gameTime.split(":");
    let gameHour: string = timeStringElements[0].padStart(2, "0");
    let gameMinute: string = timeStringElements[1].padStart(2, "0");
    
    if (gameHour == "04" && gameMinute == "00") {
        gameHour = "20";
    }

    const zuluDateTime: Date = new Date(Date.UTC(gameYear, gameMonth, gameDay, Number(gameHour), Number(gameMinute)));

    return zuluDateTime;
}