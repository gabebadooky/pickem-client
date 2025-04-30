import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks } from "../services/api";
import { Game } from "./game";
import { Team } from "./team";
import { Pick } from "./pick";
import ConfidenceModal from "./confidence";


const AwayTeamOption = ({ gameID, team, isPickModalRendered }: { gameID: string, team: Team, isPickModalRendered: boolean }) => {
    const [showModal, setShowModal] = useState(false);
    const infoCellID: string = `info-${team.teamID}`;
    const pick: Pick = {
        username: "gbtest3",
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: ""
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
                onClick={() => {
                    if (!isPickModalRendered) {
                        console.log("Away here");
                        setShowModal(true);
                    }
                }}
            />
            {showModal && <ConfidenceModal pick={pick} />}
        </td>
    );
}

const HomeTeamOption = ({ gameID, team, isPickModalRendered }: { gameID: string, team: Team, isPickModalRendered: boolean }) => {
    const [showModal, setShowModal] = useState(false);
    const infoCellID: string = `info-${team.teamID}`;
    const pick: Pick = {
        username: "gbtest1",
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: ""
    }

    return (
        <td>
            <img 
                src={team.teamLogoUrl} 
                alt={team.teamName} 
                className="teamLogo" 
                onClick={() => {
                    if (!isPickModalRendered) {
                        console.log("Home here");
                        setShowModal(true);
                    }
                }}
            />
            {showModal && <ConfidenceModal pick={pick} />}
            <span className="infoCell" id={infoCellID}>
                i
            </span>
        </td>
    );
}

const PickRow = ({ game, teams, isPickModalRendered }: { game: Game, teams: Array<Team>, isPickModalRendered: boolean }) => {
    const infoCellID: string = `info-${game.gameID}`;
    const awayTeam: Team = teams.find(t => t.teamID === game.awayTeamID);
    const homeTeam: Team = teams.find(t => t.teamID === game.homeTeamID);
    
    return (
        <tr>
            <AwayTeamOption gameID={game.gameID} team={awayTeam} isPickModalRendered={isPickModalRendered} />
            <td className="infoCell" id={infoCellID}>i</td>
            <HomeTeamOption gameID={game.gameID} team={homeTeam} isPickModalRendered={isPickModalRendered} />
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
    const [isPickModalRendered, setIsPickModalRendered] = useState(false);
    

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
                        <PickRow game={game} teams={teams} isPickModalRendered={isPickModalRendered} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PicksContainer;