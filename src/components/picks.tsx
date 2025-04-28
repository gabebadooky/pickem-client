import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks, submitPick } from "../services/api";
import { Game } from "./game";
import { Team } from "./team";
import { Pick } from "./pick";


const AwayTeamOption = ({ gameID, team }: { gameID: string, team: Team }) => {
    const infoCellID: string = `info-${team.teamID}`;
    const pick: Pick = {
        username: "gbtest3",
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: "l"
    }
    
    return (
        <td>
            <span className="infoCell" id={infoCellID}>
                i
            </span>
            <img 
                src={team.teamLogoUrl}
                alt={team.teamName}
                className="teamLogo"
                onClick={() => submitPick(pick)}
            />
        </td>
    );
}

const HomeTeamOption = ({ gameID, team }: { gameID: string, team: Team }) => {
    const infoCellID: string = `info-${team.teamID}`;
    const pick: Pick = {
        username: "gbtest3",
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: "l"
    }

    return (
        <td>
            <img 
                src={team.teamLogoUrl} 
                alt={team.teamName} 
                className="teamLogo" 
                onClick={() => submitPick(pick)}
            />
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
    const [week, setWeek] = useState(Number);
    const [filteredGames, setFilteredGames] = useState(Array<Game>)
    const [distinctUsers, setDistinctUsers] = useState(Array<string>);
    

    useEffect(() => {
        getTeams()
            .then(setTeams);
        getUserPicks("gbtest2")
            .then(setAllUserPicks);
        getGames().then((data) => {
            setGames(data);
            setFilteredGames(data.filter(game => game.week === 1));
        });            
    }, []);
    
    return (
        <div>
            <p>hi</p>
            <table>
                <tbody>
                    {filteredGames.map((game: Game) => (
                        <PickRow game={game} teams={teams} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PicksContainer;