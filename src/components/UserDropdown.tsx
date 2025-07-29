import { getUserPicks } from "../services/picksAPI";

import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";


type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    userIDs: UserIDs[];
    userIdValue: number;
}

const UserDropdown = (props: Props) => {
    return (
        <div className="m-auto">
            <select 
                name="usersDropdown"
                id="usersDropdownInput"
                onChange={(e) => {
                    props.setIsLoading(true);
                    getUserPicks(Number(e.target.value)).then(props.setPicks).then(() => props.setIsLoading(false));
                }}
                defaultValue={props.userIdValue}
            >
                {props.userIDs.map((user: UserIDs) => (
                    <option key={user.userID} value={user.userID}>{user.username}</option>
                ))}
            </select>
        </div>
    );
}


export default UserDropdown;