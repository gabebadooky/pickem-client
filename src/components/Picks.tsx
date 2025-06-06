import { useEffect, useState } from "react";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { getGames, getTeams, getUserPicks } from "../services/picksAPI";

import WeekDropdown from "./WeekDropdown";
import PickRow from "./PickRow";
import Account from "./Account";


const Picks = () => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [picks, setPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState<number>(1);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);


    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            const userID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
            getGames().then(setGames);
            getTeams().then(setTeams);
            getUserPicks(userID).then(setPicks);
            setWeek(1);
        } else {
            //navigate("/login");
        }
    }, []);


    return (
        <div>
            <table className="m-auto mt-5">
                <tbody>
                    <tr>
                        <td className="pr-2">
                            <Link to="/account"><i className="fa-solid fa-user"></i></Link>
                        </td>
                        <td className="w-5">
                            { 
                                week > 1 
                                    && 
                                <i className="fa-solid fa-arrow-left" 
                                    onClick={() => setWeek(week - 1) }>
                                </i>
                            }
                        </td>
                        
                        <td>
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

                        <td className="pl-2"><i className="fa-solid fa-bars"></i></td>
                    </tr>
                </tbody>
            </table>

            <table className="m-auto border-separate border-spacing-y-3">
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