import { CurrentUser } from "../types/account";
import { getUserPicks } from "../services/picksAPI";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";


type Props = {
    currentUser: CurrentUser;
    setIsLeaderboardComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    userIDs: UserIDs[];
}

const UsersDropdown = (props: Props) => {
    return (
        <div className="relative inline-block m-auto">
            <select
                className="appearance-none bg-transparent cursor-pointer rounded text-transparent w-full pl-10 pr-3"
                defaultValue={props.currentUser.userID}
                id="users-dropdown-input"
                name="users-dropdown"
                onChange={(e) => {
                    const newUserID: number = Number(e.target.value);
                    if (newUserID !== 99999) {
                        getUserPicks(newUserID).then(props.setPicks).finally(() => props.setIsLoading(false));
                    } else {
                        props.setIsLeaderboardComponentOpen(true);
                    }
                }}
            >
                <option value="99999" selected>Leaderboard</option>
                {
                    props.currentUser.userID !== -1
                        &&
                    <option
                        key={props.currentUser.userID}
                        value={props.currentUser.userID}
                        selected
                    >
                        {props.currentUser.username}
                    </option>
                }
                {props.userIDs.map((user: UserIDs) => {
                    if (user.userID !== props.currentUser.userID) {
                        return (
                            <option key={user.userID} value={user.userID}>{user.username}</option>
                        );
                    }
                })}
            </select>

            <i
                className="fa-solid fa-bars fa-2xl pointer-events-none absolute left-[43.5%] top-1/2 transform -translate-y-1/2"
                aria-hidden="true"
            ></i>
        </div>
    );
}


export default UsersDropdown;