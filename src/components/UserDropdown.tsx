import React from "react";
import { CurrentUser } from "../types/account";
import { UserIDs } from "../types/userIDs";

type Props = {
    currentUser: CurrentUser;
    setViewPicksOfUser: React.Dispatch<React.SetStateAction<number>>;
    userIDs: UserIDs[];
}

const UserDropdown = (props: Props) => {
    return (
        <div className="m-auto">
            <select 
                name="usersDropdown" 
                id="usersDropdownInput"
                value={props.currentUser.userID !== 0 ? props.currentUser.userID : props.userIDs[0].userID}
                onChange={(e) => props.setViewPicksOfUser(Number(e.target.value))}
            >
                {props.userIDs.map((user: UserIDs) => (
                    <option key={user.userID} value={user.userID}>{user.username}</option>
                ))}
            </select>
        </div>
    );
}


export default UserDropdown;