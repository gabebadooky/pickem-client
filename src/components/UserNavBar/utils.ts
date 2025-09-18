export const handleDecrementUserIndexClick = (setUserFilter: React.Dispatch<React.SetStateAction<number>>, userFilter: number): void => {
    setUserFilter(userFilter - 1);
}

export const handleIncrementUserIndexClick = (setUserFilter: React.Dispatch<React.SetStateAction<number>>, userFilter: number): void => {
    setUserFilter(userFilter + 1);
}