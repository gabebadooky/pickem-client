import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";
import { getGames, getTeams, getUserPicks, getUserIDs } from "../services/picksAPI";
import { tokenStillValid } from "../services/validateToken";
import WeekDropdown from "./WeekDropdown";
import PickRow from "./PickRow";
import LoadingSpinner from "./LoadingSpinner";


const Picks = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>)
    const [picks, setPicks] = useState(Array<Pick>);
    const [userIDs, setUserIDs] = useState(Array<UserIDs>);
    const [week, setWeek] = useState<number>(1);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenStillValid()) {
            const userID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
            getGames().then(setGames);
            getTeams().then(setTeams);
            getUserPicks(userID).then(setPicks).finally(() => setIsLoading(false));
            getUserIDs().then(setUserIDs);
            setWeek(1);
        } else {
            localStorage.clear();
            navigate("/");
        }
        console.log(`setting isLoading to True`);
        setIsLoading(true);
    }, []);

    return (
        <div>
            {
                isLoading
                    &&
                <LoadingSpinner />
            }

            <table className="m-auto mt-3">
                <tbody>
                    <tr>
                        <td>
                            <Link to="/account"><i className="fa-solid fa-user"></i></Link>
                        </td>

                        <td>
                            <select name="usersDropdown" id="usersDropdownInput">
                                {userIDs.map((user: UserIDs) => (
                                    <option key={user.userID} value={user.userID}>{user.username}</option>
                                ))}
                            </select>
                        </td>

                        <td>
                            <button 
                                onClick={() => {
                                    localStorage.clear();
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </button>
                        </td>
                    </tr>
                    <tr><td><br /></td></tr>
                    <tr>
                        <td className="w-5">
                            { 
                                week > 1 
                                    && 
                                <i className="fa-solid fa-arrow-left" 
                                    onClick={() => setWeek(week - 1) }>
                                </i>
                            }
                        </td>
                        
                        <td className="">
                            <WeekDropdown weeks={18} selectedWeek={week} setWeek={setWeek} />
                        </td>
                        
                        <td className="w-5">
                            { 
                                week < 18 
                                    && 
                                <i className="fa-solid fa-arrow-right" 
                                    onClick={() => setWeek(week + 1)}>
                                </i>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="m-auto border-separate border-spacing-3">
                <tbody>

                    {games.filter(game => game.week === week).map((game: Game) => (
                        <PickRow
                            key={game.gameID}
                            game={game}
                            teams={teams}
                            picks={picks}
                            setPicks={setPicks}
                            isModalCurrentlyRendered={isModalCurrentlyRendered}
                            setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                        />
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Picks;