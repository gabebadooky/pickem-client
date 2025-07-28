import React from "react";

import { getUserPicks } from "../services/picksAPI";

import { CurrentUser } from "../types/account";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";


type Props = {
    currentUser: CurrentUser;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    userIDs: UserIDs[];
}

const UserDropdown = (props: Props) => {
    return (
        <div className="m-auto">
            <select 
                name="usersDropdown"
                defaultValue={props.currentUser.userID}
                id="usersDropdownInput"
                onChange={(e) => getUserPicks(Number(e.target.value)).then(props.setPicks)}
            >
                {props.userIDs.map((user: UserIDs) => (
                    <option key={user.userID} value={user.userID}>{user.username}</option>
                ))}
            </select>
        </div>
    );
}


export default UserDropdown;