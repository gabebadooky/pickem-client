import { UserNavBarProps } from "./types";
import { UserDropdown } from "./UserDropdown";
import { handleDecrementUserIndexClick, handleIncrementUserIndexClick } from "./component";
import { LeftArrow } from "../NavArrows/LeftArrow";
import RightArrow from "../NavArrows/RightArrow/component";


const UserNavBar = (props: UserNavBarProps) => {
    return (
        <div
            className="h-[10%] flex justify-between m-auto top-0 w-full"
            id="picks-page-user-nav-bar"
        >
            <LeftArrow onClick={handleDecrementUserIndexClick(props.setUserFilter, props.userFilter)} />
            <UserDropdown
                allUsers={props.allUsers}
                userFilter={props.userFilter}
                setUserFilter={props.setUserFilter}
            />
            <RightArrow onClick={handleIncrementUserIndexClick(props.setUserFilter, props.userFilter)} />
        </div>
    );
}

export default UserNavBar;