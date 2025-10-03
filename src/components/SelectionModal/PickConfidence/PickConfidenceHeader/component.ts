export const formattedTeamRecord = (wins: number, losses: number, ties: number): string => {
    if (ties && ties > 0) {
        return `${wins}-${losses}-${ties}`;

    } else {
        return `${wins}-${losses}`;
        
    }
}