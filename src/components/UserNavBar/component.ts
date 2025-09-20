import { User } from "../../types/user";

export const handleDecrementUserIndexClick = (allUsers: User[], setUserFilter: React.Dispatch<React.SetStateAction<number>>, userFilter: number): void => {
    if (allUsers.findIndex(user => user.userID === userFilter) - 1 > 0) {
        setUserFilter(
            allUsers[(allUsers.findIndex(user => user.userID === userFilter) - 1)].userID 
        );
    } else {
        setUserFilter(allUsers[allUsers.length - 1].userID);
    }
}

export const handleIncrementUserIndexClick = (allUsers: User[], setUserFilter: React.Dispatch<React.SetStateAction<number>>, userFilter: number): void => {
    if (allUsers.findIndex(user => user.userID === userFilter) + 1 < allUsers.length) {
        setUserFilter(
            allUsers[(allUsers.findIndex(user => user.userID === userFilter) + 1)].userID 
        );
    } else {
        setUserFilter(allUsers[0].userID);
    }
}