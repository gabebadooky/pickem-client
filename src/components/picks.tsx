import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks, submitPick } from "../services/api";
import { Game } from "./game";
import { Team } from "./team";
import { Pick } from "./pick";


const AwayTeamOption = ({ gameID, team }: { gameID: string, team: Team }) => {
    const infoCellID: string = `info-${team.teamID}`;
    
    return (
        <td>
            <span className="infoCell" id={infoCellID}>
                i
            </span>
            <img 
                src={team.teamLogoUrl}
                alt={team.teamName}
                className="teamLogo"
                // render pickWeight modal
            />
        </td>
    );
}

const HomeTeamOption = ({ gameID, team }: { gameID: string, team: Team }) => {
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
            <AwayTeamOption gameID={ game.gameID } team={ awayTeam } />
            <td className="infoCell" id={infoCellID}>i</td>
            <HomeTeamOption gameID={ game.gameID } team={ homeTeam } />
        </tr>
    )
}


const PicksContainer = () => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [allUserPicks, setAllUserPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState(1);
    const [filteredGames, setFilteredGames] = useState(Array<Game>)
    //const distinctUsers = [...new Set(allUserPicks.map(pick => pick.userID))];
    const [distinctUsers, setDistinctUsers] = useState(Array<string>);

    /* function filterWeek (z: number) {
        return games.filter(game => {
            game.week == z;
        });
    }; */
    

    useEffect(() => {
        getTeams()
            .then(setTeams);
        getUserPicks("gbtest2")
            .then(setAllUserPicks);
        getGames()
            .then(setGames);
    }, []);
    
    return (
        <div>
            <p>hi</p>
            <table>
                {games
                    .filter(game => { console.log(game); game.week  === week })
                    .map((game: Game) => (
                        <PickRow game={game} teams={teams} />
                    ))
                }
            </table>
        </div>
    )
}

export default PicksContainer;