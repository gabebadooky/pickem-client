import { User } from "../../../types/user";
import { UserOption } from "./UserOption"


export const renderAllUserOptions = (allUsers: User[]) => {
    for (let i = 0; i < allUsers.length; i++) {
        const userID: number = allUsers[i].userID;
        const userDisplayName: string = allUsers[i].displayName || allUsers[i].username;

        return UserOption(userID, userDisplayName);
    }
}