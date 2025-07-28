const monthAbbreviations: Record<string, string> = {
    "Jan": "1", "Feb": "2", "Mar": "3", 
    "Apr": "4", "May": "5", "Jun": "6", 
    "Jul": "7", "Aug": "8", "Sep": "9", 
    "Oct": "10", "Nov": "11", "Dec": "12"
};


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
    const formattedDate: string = zuluDateTime.toLocaleDateString("en", {weekday: "long", month: "long", day: "numeric"});

    return formattedDate;
}