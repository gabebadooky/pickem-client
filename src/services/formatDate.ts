const monthAbbreviations: Record<string, string> = {
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
    { start: new Date("2025-12-23"), end: new Date("2025-12-29") }
];


export const calculateCurrentWeek = () => {
    const now: Date = new Date();
    console.log(`now: ${now}`);
    if (now < seasonWeeks[0].start) {
        // return week 0 if now < seasonWeeks[0].start
        return 0;

    } else {
        for (let i = 0; i < seasonWeeks.length; i++) {
            if (seasonWeeks[i].start <= now) {
                return i;
            }
        }

        // return last week of season if now > seasonWeeks[seasonWeeks.length].end
        return seasonWeeks.length - 1;
    }

}


export const zuluTimeToLocaleFormattedDate = (gameDate: Date, gameTime: string) => {
    const dateStringElements: string[] = gameDate.toString().replace(",", "").split(" ");
    const gameYear: string = dateStringElements[3];
    const gameMonth: string = monthAbbreviations[dateStringElements[2]]?.padStart(2, "0") || "00";
    const gameDay: string = dateStringElements[1].padStart(2, "0");

    const timeStringElements: string[] = gameTime.split(":");
    let gameHour: string = timeStringElements[0].padStart(2, "0");
    let gameMinute: string = timeStringElements[1].padStart(2, "0");
    if (gameHour == "04" && gameMinute == "00") {
        gameHour = "20";
    }

    const zuluDateTime: Date = new Date(`${gameYear}-${gameMonth}-${gameDay}T${gameHour}:${gameMinute}Z`);

    return zuluDateTime;
}

export const zuluTimeToLocaleFormattedDateString = (gameDate: Date, gameTime: string) => {
    return zuluTimeToLocaleFormattedDate(gameDate, gameTime).toLocaleDateString("en", {weekday: "long", month: "long", day: "numeric"});
}
