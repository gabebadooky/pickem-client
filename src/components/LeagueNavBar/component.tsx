import { useNavigate } from "react-router";
import { LeagueDropdown } from "./LeagueDropdown";
import { LeagueNavBarProps } from "./types";


const LeagueNavBar = (props: LeagueNavBarProps) => {
    const navigate = useNavigate();


    return (
        <div
            className="flex grid grid-cols-10 h-full top-0 w-full"
            id="picks-page-league-div"
        >
            <div className="col-span-1"></div>
            <div className="col-span-8">
                <LeagueDropdown
                    defaultValue={props.leagueFilter}
                    setLeagueFilter={props.setLeagueFilter}
                />
            </div>
            <span
                className="col-span-1 right-0 text-right text-sm w-full"
                onClick={() => {
                    props.setIsLoading(true);
                    props.authenticatedUser.userID > 0 ? navigate("/account") : navigate("login");
                }}
            >
                <i className="fa-slab fa-regular fa-sm fa-user m-auto"></i>
                <p>{ props.authenticatedUser.userID > 0 ? "Me" : "Login" }</p>
            </span>
        </div>
    );
}


export default LeagueNavBar;