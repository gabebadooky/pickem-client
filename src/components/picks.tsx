import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks } from "../services/picksAPI";
import { Game } from "../types/game";
import { Team, NullTeam } from "../types/team";
import { Pick } from "../types/pick";
import ConfidenceModal from "./confidence";


const AwayTeamOption = ({ gameID, team, isConfidenceModalRendered, onShow, onClose }: { gameID: string, team: Team, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function }) => {
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
            <span className="infoCell" id={infoCellID}>
                i
            </span>
            <img 
                src={team.teamLogoUrl}
                alt={team.teamName}
                className="teamLogo"
                onClick={() => {
                    if (!isConfidenceModalRendered) {
                        console.log("Away here");
                        setShowModal(true);
                        onShow(true); // setIsConfidenceModalRendered(true)
                    }
                }}
            />
            {
                showModal 
                    && 
                <ConfidenceModal 
                    pick={pick}
                    onClose={() => {
                        onClose(false);
                        setShowModal(false);
                    }} //setIsConfidenceModalRendered(false)
                />
            }
        </td>
    );
}

const HomeTeamOption = ({ gameID, team, isConfidenceModalRendered, onShow, onClose }: { gameID: string, team: Team, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function }) => {
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
                    if (!isConfidenceModalRendered) {
                        console.log("Home here");
                        setShowModal(true);
                        onShow(true); // setIsConfidenceModalRendered(true)
                    }
                }}
            />
            {
                showModal 
                    && 
                <ConfidenceModal 
                    pick={pick} 
                    onClose={() => {
                        onClose(false);
                        setShowModal(false);
                    }} // setIsConfidenceModalRendered(false)
                />
            }
            <span className="infoCell" id={infoCellID}>
                i
            </span>
        </td>
    );
}

const PickRow = ({ game, teams, isConfidenceModalRendered, onShow, onClose }: { game: Game, teams: Array<Team>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function }) => {
    const infoCellID: string = `info-${game.gameID}`;
    const awayTeam: Team = teams.find(t => t.teamID === game.awayTeamID) || NullTeam;
    const homeTeam: Team = teams.find(t => t.teamID === game.homeTeamID) || NullTeam;
    
    return (
        <tr>
            <AwayTeamOption 
                gameID={game.gameID}
                team={awayTeam}
                isConfidenceModalRendered={isConfidenceModalRendered}
                onShow={onShow}
                onClose={onClose}
            />
            <td className="infoCell" id={infoCellID}>i</td>
            <HomeTeamOption
                gameID={game.gameID}
                team={homeTeam}
                isConfidenceModalRendered={isConfidenceModalRendered}
                onShow={onShow}
                onClose={onClose}
            />
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
    const [isConfidenceModalRendered, setIsConfidenceModalRendered] = useState(false);
    

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
                        <PickRow
                            game={game}
                            teams={teams}
                            isConfidenceModalRendered={isConfidenceModalRendered}
                            onShow={() => setIsConfidenceModalRendered(true)}
                            onClose={() => setIsConfidenceModalRendered(false)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PicksContainer;