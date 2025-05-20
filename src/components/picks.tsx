import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { getGames, getTeams, getUserPicks } from "../services/picksAPI";
import { Game } from "../types/game";
import { Team, NullTeam } from "../types/team";
import { Pick } from "../types/pick";

import GameInfoModal from "./gameInfoModal";
import ConfidenceModal from "./confidenceModal";


const AwayTeamOption = ({ gameID, team, picks, isConfidenceModalRendered, onShow, onClose }: { gameID: string, team: Team, picks: Array<Pick>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function }) => {
    const [showModal, setShowModal] = useState(false);
    const infoCellID: string = `info-${team.teamID}`;
	const userID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
    const pick: Pick = {
        userID: userID,
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: ""
    }

    if (picks.find(p => p.teamPicked === team.teamID)) {
        // Apply styling if user has selected this team
    }
    
    return (
        <>
            <td className="size-16 text-right text-white">
                <i className="fa-solid fa-circle-info"></i>
            </td>
            <td className="size-16 justify-center">
                <img 
                    src={team.teamLogoUrl}
                    alt={team.teamName}
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
                        }}
                    />
                }
            </td>
        </>
    );
}

const HomeTeamOption = ({ gameID, team, picks, isConfidenceModalRendered, onShow, onClose }: { gameID: string, team: Team, picks: Array<Pick>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function }) => {
    const [showModal, setShowModal] = useState(false);
    const infoCellID: string = `info-${team.teamID}`;
	const userID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
    const pick: Pick = {
        userID: userID,
        gameID: gameID,
        teamPicked: team.teamID,
        pickWeight: ""
    }

    if (picks.find(p => p.teamPicked === team.teamID)) {
        // Apply styling if user has selected this team
    }

    return (
        <>
            <td className="size-16 justify-center">
                <img 
                    src={team.teamLogoUrl} 
                    alt={team.teamName}
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
                        }}
                    />
                }
            </td>

            <td className="size-16 text-left">
                <i className="fa-solid fa-circle-info"></i>
            </td>
        </>
    );
}

const PickRow = ({ game, teams, picks, isConfidenceModalRendered, onShow, onClose }: { game: Game, teams: Array<Team>, picks: Array<Pick>, isConfidenceModalRendered: boolean, onShow: Function, onClose: Function }) => {
    const infoCellID: string = `info-${game.gameID}`;
    const awayTeam: Team = teams.find(t => t.teamID === game.awayTeamID) || NullTeam;
    const homeTeam: Team = teams.find(t => t.teamID === game.homeTeamID) || NullTeam;
    //const awayAtHomeString: string = `${awayTeam.teamName} ${awayTeam.teamMascot} @ ${homeTeam.teamName} ${homeTeam.teamMascot}`;

    return (
        <tr className="">
            <AwayTeamOption 
                gameID={game.gameID}
                team={awayTeam}
                picks={picks}
                isConfidenceModalRendered={isConfidenceModalRendered}
                onShow={onShow}
                onClose={onClose}
            />

            <td className="px-5" id={infoCellID}>
                <i className="fa-solid fa-circle-info"></i>
            </td>
            
            <HomeTeamOption
                gameID={game.gameID}
                team={homeTeam}
                picks={picks}
                isConfidenceModalRendered={isConfidenceModalRendered}
                onShow={onShow}
                onClose={onClose}
            />
        </tr>
    )
}


const PicksContainer = ({ setIsAuthenticated }: { setIsAuthenticated: Function }) => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [allUserPicks, setAllUserPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState(Number);
    const [filteredGames, setFilteredGames] = useState(Array<Game>)
    const [distinctUsers, setDistinctUsers] = useState(Array<string>);
    const [isConfidenceModalRendered, setIsConfidenceModalRendered] = useState(false);
    

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            setIsAuthenticated(false);
        } else {
            const decodedToken = jwtDecode(localStorage.getItem("jwt") || "");
            const decodedUserID = decodedToken.sub?.toString() || "0";
            getTeams()
                .then(setTeams);
            getUserPicks(decodedUserID)
                .then(setAllUserPicks);
            getGames().then((data) => {
                setGames(data);
                setFilteredGames(data.filter(game => game.week === 1));
            
            }); 
        }
                   
    }, []);
    
    return (
        <div>
            <table className="m-auto border-separate border-spacing-y-3">
                <tbody>
                    {filteredGames.map((game: Game) => (
                        <PickRow
                            key={game.gameID}
                            game={game}
                            teams={teams}
                            picks={allUserPicks}
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