import { UserDropdownProps } from "./types";
import { UserOption } from "./UserOption";


const UserDropdown = (props: UserDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setUserFilter(Number(e.currentTarget.value));
    }

    return (
        <select
            className="appearance-none h-full m-auto px-5 text-center w-full"
            id="user-dropdown-input"
            name="user-dropdown"
            onChange={(e) => handleChangeEvent(e)}
        >
            {props.allUsers.map((user) => {
                return UserOption(user.userID, user.displayName || user.username);
            })};
        </select>
    );
}


export default UserDropdown;