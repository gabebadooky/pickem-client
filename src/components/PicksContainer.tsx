import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { getGames, getTeams, getUserPicks } from "../services/picksAPI";

import WeekDropdown from "./WeekDropdown";
import PickRow from "./PickRow";


const PicksContainer = ({ setIsAuthenticated }: { setIsAuthenticated: Function }) => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [picks, setPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState<number>(1);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);


    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            setIsAuthenticated(false);
        } else {
            const userID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
            getGames().then(setGames);
            getTeams().then(setTeams);
            getUserPicks(userID).then(setPicks);
            setWeek(1);
        }
    }, []);


    return (
        <div>
            <span>
                { week === 1 && <i className="fa-solid fa-arrow-left" onClick={() => setWeek(week - 1)}></i> }
                <WeekDropdown weeks={18} setWeek={setWeek} />
                { week === 18 && <i className="fa-solid fa-arrow-right" onClick={() => setWeek(week + 1)}></i> }
            </span>            

            <table className="m-auto border-separate border-spacing-y-3">
                <tbody>
                    {games.filter(game => game.week === week).map((game: Game) => (
                        <PickRow
                            key={game.gameID}
                            game={game}
                            teams={teams}
                            picks={picks}
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

export default PicksContainer;