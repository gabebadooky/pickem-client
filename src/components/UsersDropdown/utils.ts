import { User } from "../../types/user"
import { UserOption } from "./UserOption"

export const renderAllUserOptions = (allUsers: User[]) => {
    for (let i = 0; i < allUsers.length; i++) {
        return UserOption(allUsers[i].userID, allUsers[i].displayName|| allUsers[i].username);
    }
}