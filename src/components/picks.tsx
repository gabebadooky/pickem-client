import { useEffect, useState } from "react";
import { getGames, getTeams, getUserPicks, submitPick } from "../services/api";
import { Game } from "./game";
import { Team } from "./team";
import { Pick } from "./pick";



const PicksContainer = () => {
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [allUserPicks, setAllUserPicks] = useState([]);
    const [week, setWeek] = useState(1);

    useEffect(() => {
        getGames();
        getTeams();
        getUserPicks(38);
    }, [setGames, setTeams, setAllUserPicks]);

    return (
        <div>
        </div>
    )
}

export default PicksContainer;