import { renderTeamName } from "./component";
import { FavoriteTeamDropdownProps } from "./types";


const FavoriteTeamDropdown = (props: FavoriteTeamDropdownProps) => {
    const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const favoriteTeamSelection = e.currentTarget.value;
        props.setFavoriteTeam(favoriteTeamSelection);
    }


    return (
        <select
            className="h-full m-auto rounded-xl text-center w-full"
            id={props.componentID}
            name={props.componentName}
            onChange={(e) => handleChangeEvent(e)}
            value={props.defaultValue}
        >
            <option
                id="default-favorite-team-option"
                key="default-favorite-team-option"
                value="0"
            >Favorite Team</option>

            {props.allTeams.map((team) => {
                return (
                    <option
                        id={`${team.teamID}-favorite-team-option`}
                        key={`${team.teamID}-favorite-team-option`}
                        value={team.teamID}
                    >
                        {renderTeamName(team)}
                    </option>
                );
            })}
        </select>
    );
}


export default FavoriteTeamDropdown;