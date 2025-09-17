import { CurrentUser } from "../types/account";
import { getUserPicks } from "../original-services/picksAPI";
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
                className="appearance-none bg-transparent cursor-pointer rounded text-transparent w-full pl-3 pr-3"
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
                    <option
                        key={props.currentUser.userID}
                        value={props.currentUser.userID}
                        selected
                    >
                        Me ({props.currentUser.displayName})
                    </option>
                }
                {props.userIDs.map((user: UserIDs) => {
                    if (user.userID !== props.currentUser.userID) {
                        return (
                            <option key={user.userID} value={user.userID}>{user.displayName}</option>
                        );
                    }
                })}
            </select>

            <i
                className="fa-solid fa-bars fa-2xl pointer-events-none absolute right-[5%] top-1/2 transform -translate-y-1/2"
                aria-hidden="true"
            ></i>
        </div>
    );
}


export default UsersDropdown;