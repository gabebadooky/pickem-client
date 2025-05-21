import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { getGames, getTeams, getUserPicks } from "../services/picksAPI";
import PickRow from "./pickRow";


export const PicksContainer = ({setIsAuthenticated}: {setIsAuthenticated: Function}) => {
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [picks, setPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState(Number);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState(false);


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
    });

    const ModalContext = createContext({ isModalCurrentlyRendered, setIsModalCurrentlyRendered });

    return (
        <ModalContext.Provider value={{ isModalCurrentlyRendered, setIsModalCurrentlyRendered }}>
            <table className="m-auto border-separate border-spacing-y-3">
                <tbody>
                    {games.filter(game => game.week === week).map((game: Game) => (
                        <PickRow
                            pickRowProps={{
                                game: game,
                                teams: teams,
                                picks: picks
                            }}
                        />
                    ))
                    }
                </tbody>
            </table>
        </ModalContext.Provider>
    )
}

export default PicksContainer;