import { UserDropdownProps } from "./types";
import { renderAllUserOptions } from "./component";


const UserDropdown = (props: UserDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setUserFilter(Number(e.currentTarget.value));
    }

    return (
        <select
            className="h-full m-auto w-full"
            id="user-dropdown-input"
            name="user-dropdown"
            onChange={(e) => handleChangeEvent(e)}
        >
            {renderAllUserOptions(props.allUsers)}
        </select>
    );
}


export default UserDropdown;