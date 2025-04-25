import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks, submitPick } from "../services/api";
import { Game } from "./game";
import { Team } from "./team";
import { Pick } from "./pick";


const AwayTeamOption = ({ team }: { team: Team }) => {
    const infoCellID: string = `info-${team.teamID}`;
    
    return (
        <td>
            <span className="infoCell" id={infoCellID}>
                i
            </span>
            <img src={team.teamLogoUrl} alt={team.teamName} className="teamLogo" />
        </td>
    );
}

const HomeTeamOption = ({ team }: { team: Team }) => {
    const infoCellID: string = `info-${team.teamID}`;

    return (
        <td>
            <img src={team.teamLogoUrl} alt={team.teamName} className="teamLogo" />
            <span className="infoCell" id={infoCellID}>
                i
            </span>
        </td>
    );
}

const PickRow = ({ game, teams }: { game: Game, teams: Array<Team> }) => {
    const infoCellID: string = `info-${game.gameID}`;
    const awayTeam: Team = teams.find(t => t.teamID === game.awayTeamID);
    const homeTeam: Team = teams.find(t => t.teamID === game.homeTeamID);
    
    return (
        <tr>
            <AwayTeamOption team={ awayTeam } />
            <td className="infoCell" id={infoCellID}>i</td>
            <HomeTeamOption team={ homeTeam } />
        </tr>
    )
}


const PicksContainer = () => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [allUserPicks, setAllUserPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState(1);
    const [weekGames, setWeekGames] = useState(Array<Game>)
    //const distinctUsers = [...new Set(allUserPicks.map(pick => pick.userID))];
    const [distinctUsers, setDistinctUsers] = useState(Array<string>);
    const filterWeek = games.filter(game => {
        game.week === week;
    });

    useEffect(() => {
        getGames();
        getTeams();
        getUserPicks("gbtest2");
        setWeekGames(filterWeek);
    }, [setGames, setTeams, setAllUserPicks]);
    
    return (
        <table>
            {weekGames.map((game: Game) => (
                <PickRow game={game} teams={teams} />
            ))}
        </table>
    )
}

export default PicksContainer;