export const handleDecrementWeekClick = (setWeekFilter: React.Dispatch<React.SetStateAction<number>>, weekFilter: number): void => {
    setWeekFilter(weekFilter - 1);
}

export const handleIncrementWeekClick = (setWeekFilter: React.Dispatch<React.SetStateAction<number>>, weekFilter: number): void => {
    setWeekFilter(weekFilter + 1);
}