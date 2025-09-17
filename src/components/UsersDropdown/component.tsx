import { UserDropdownProps } from "./types";


const UsersDropdown = (props: UserDropdownProps) => {
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
            {}
        </select>
    );
}


export default UsersDropdown;