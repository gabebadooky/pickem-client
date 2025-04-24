import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks, submitPick } from "../services/api";
import { Game } from "./game";
import { Team } from "./team";
import { Pick } from "./pick";

interface teamOptionProps {
    props: {
        teams: Array<Team>;
        teamID: string;
    }
}

const awayTeamOption = ({ props }: teamOptionProps) => {
    const team: Team = props.teams.find(t => t.teamID === props.teamID);
    const infoCellID: string = `info-${team.teamID}`;
    
    return (
        <td>
            <span className="infoCell" id={infoCellID}>
                i
            </span>
            <img src={team.teamLogoUrl} alt={team.teamName} />
        </td>
    )
}

const homeTeamOption = ({ props }: teamOptionProps) => {
    const team: Team = props.teams.find(t => t.teamID === props.teamID);
    const infoCellID: string = `info-${team.teamID}`;

    return (
        <td>
            <img src={team.teamLogoUrl} alt={team.teamName} />
            <span className="infoCell" id={infoCellID}>
                i
            </span>
        </td>
    )
}

const pickRow = (game: Game) => {
    const infoCellID: string = `info-${game.gameID}`;

    return (
        <tr>
            <awayTeamOption props={ teams } />
        </tr>
    )
}


const PicksContainer = () => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [allUserPicks, setAllUserPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState(1);
    const [weekGames, setWeekGames] = useState(Array<Game>)

    const filterWeek = games.filter(game => {
        game.week === week;
    });

    useEffect(() => {
        getGames();
        getTeams();
        getUserPicks(38);
        setWeekGames(filterWeek);
    }, [setGames, setTeams, setAllUserPicks]);

    return (
        <div>
        </div>
    )
}

export default PicksContainer;