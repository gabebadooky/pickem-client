import { Team } from "../../types/team";


export type FavoriteTeamDropdownProps = {
    allTeams: Team[];
    componentID: string;
    componentName: string;
    defaultValue: string;
    setFavoriteTeam: React.Dispatch<React.SetStateAction<string>>;
}