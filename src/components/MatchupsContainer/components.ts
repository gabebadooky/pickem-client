export const instantiateFormattedGameDate = (gameDate: Date, gameTime: string): string => {
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

    return zuluDateTime.toLocaleString("en", { weekday: "long", month: "long", day: "numeric" });
}