import { League } from "../../../types/league";


export const LeagueOption = (leagueValue: League, leagueInnerText: string) => {
    return (
        <option 
            id={`league-dropdown-input-${leagueValue}-option`}
            key={`league-dropdown-input-${leagueValue}-option`}
            value={leagueValue}
        >
            {leagueInnerText}
        </option>
    );
}