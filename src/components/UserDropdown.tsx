import { getUserPicks } from "../services/picksAPI";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";


type Props = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    userIDs: UserIDs[];
}

const UsersDropdown = (props: Props) => {
    return (
        <div className="relative inline-block m-auto">
            <select
                className="appearance-none bg-transparent cursor-pointer rounded text-transparent w-full pl-10 pr-3"
                id="users-dropdown-input"
                name="users-dropdown"
                onChange={(e) => {
                    const newUserID: number = Number(e.target.value);
                    props.setIsLoading(true);
                    if (newUserID !== 99999) {
                        getUserPicks(newUserID).then(props.setPicks).finally(() => props.setIsLoading(false));
                    }
                }}
            >
                <option value={99999}>Leaderboard</option>
                {props.userIDs.map((user: UserIDs) => (
                    <option key={user.userID} value={user.userID}>{user.username}</option>
                ))}
            </select>

            <i
                className="fa-solid fa-bars fa-xl pointer-events-none absolute left-[43.5%] top-1/2 transform -translate-y-1/2"
                aria-hidden="true"
            ></i>
        </div>
    );
}


export default UsersDropdown;