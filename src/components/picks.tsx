import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { getGames, getTeams, getUserPicks } from "../services/picksAPI";
import { Game } from "../types/game";
import { Team, NullTeam } from "../types/team";
import { Pick } from "../types/pick";
import ConfidenceModal from "./confidence";


const AwayTeamOption = ({ gameID, team, picks, isConfidenceModalRendered, onShow, onClose, token }: { gameID: string, team: Team, picks: Array<Pick>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function, token: string }) => {
    const [showModal, setShowModal] = useState(false);
    const infoCellID: string = `info-${team.teamID}`;
    const decodedToken = jwtDecode(token);
    const pick: Pick = {
        userID: decodedToken.sub?.toString() || "0",
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: ""
    }

    if (picks.find(p => p.teamPicked === team.teamID)) {
        // Apply styling if user has selected this team
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
                    token={token}
                />
            }
        </td>
    );
}

const HomeTeamOption = ({ gameID, team, picks, isConfidenceModalRendered, onShow, onClose, token }: { gameID: string, team: Team, picks: Array<Pick>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function, token: string }) => {
    const [showModal, setShowModal] = useState(false);
    const infoCellID: string = `info-${team.teamID}`;
    const decodedToken = jwtDecode(token);
    const pick: Pick = {
        userID: decodedToken.sub?.toString() || "0",
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: ""
    }

    if (picks.find(p => p.teamPicked === team.teamID)) {
        // Apply styling if user has selected this team
    }

    return (
        <td>
            <img 
                src={team.teamLogoUrl} 
                alt={team.teamName} 
                className="teamLogo" 
                onClick={() => {
                    if (!isConfidenceModalRendered) {
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
                    token={token}
                />
            }
            <span className="infoCell" id={infoCellID}>
                i
            </span>
        </td>
    );
}

const PickRow = ({ game, teams, picks, isConfidenceModalRendered, onShow, onClose, token }: { game: Game, teams: Array<Team>, picks: Array<Pick>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function, token: string }) => {
    const infoCellID: string = `info-${game.gameID}`;
    const awayTeam: Team = teams.find(t => t.teamID === game.awayTeamID) || NullTeam;
    const homeTeam: Team = teams.find(t => t.teamID === game.homeTeamID) || NullTeam;
    
    return (
        <tr>
            <AwayTeamOption 
                gameID={game.gameID}
                team={awayTeam}
                picks={picks}
                isConfidenceModalRendered={isConfidenceModalRendered}
                onShow={onShow}
                onClose={onClose}
                token={token}
            />
            <td className="infoCell" id={infoCellID}>i</td>
            <HomeTeamOption
                gameID={game.gameID}
                team={homeTeam}
                picks={picks}
                isConfidenceModalRendered={isConfidenceModalRendered}
                onShow={onShow}
                onClose={onClose}
                token={token}
            />
        </tr>
    )
}


const PicksContainer = ({ token }: { token: string }) => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [allUserPicks, setAllUserPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState(Number);
    const [filteredGames, setFilteredGames] = useState(Array<Game>)
    const [distinctUsers, setDistinctUsers] = useState(Array<string>);
    const [isConfidenceModalRendered, setIsConfidenceModalRendered] = useState(false);
    

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        const decodedUserID = decodedToken.sub?.toString() || "0";
        getTeams()
            .then(setTeams);
        getUserPicks(decodedUserID)
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
                            picks={allUserPicks}
                            isConfidenceModalRendered={isConfidenceModalRendered}
                            onShow={() => setIsConfidenceModalRendered(true)}
                            onClose={() => setIsConfidenceModalRendered(false)}
                            token={localStorage.getItem("jwt") || ""}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PicksContainer;