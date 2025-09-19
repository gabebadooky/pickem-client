import { UserNavBarProps } from "./types";
import { UserDropdown } from "./UserDropdown";
import { handleDecrementUserIndexClick, handleIncrementUserIndexClick } from "./component";


const UserNavBar = (props: UserNavBarProps) => {
    return (
        <div
            className="h-[10%] flex justify-between m-auto top-0 w-full"
            id="picks-page-user-nav-bar"
        >

            <i
                className="fa-slab fa-regular fa-arrow-left"
                onClick={() => handleDecrementUserIndexClick(props.setUserFilter, props.userFilter)}
            ></i>
            
            <UserDropdown
                allUsers={props.allUsers}
                userFilter={props.userFilter}
                setUserFilter={props.setUserFilter}
            />
            
            <i
                className="fa-slab fa-regular fa-arrow-right"
                onClick={() => handleIncrementUserIndexClick(props.setUserFilter, props.userFilter)}
            ></i>

        </div>
    );
}

export default UserNavBar;